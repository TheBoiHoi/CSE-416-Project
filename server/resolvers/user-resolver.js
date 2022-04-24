const User=require('../models/user')
const bcrypt=require('bcrypt')
const Item = require('../models/item')
const Trade=require('../models/trade')
const PublicProfile=require('../models/PublicProfile')
const auth=require('../token.js')
const ObjectId=require('bson-objectid')
const QRCode=require('qrcode')
const QRCodeReader=require('qrcode-reader')
const fs=require('fs')
const path=require('path')
const Jimp=require('jimp')
const algosdk = require('algosdk');
const company = require('../models/company')
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
const port = '';
const token = {
    'X-API-Key': 'X4SwVT0RbP46NwfrQxmM61U3pqTUoekDLSigOTpb'
}
const axios=require('axios')
const algodclient = new algosdk.Algodv2(token, baseServer, port);

const login = async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email:email})
        if(user==null){
            return res.status(404).send()
        }
        const hash=await user.password
        const valid = await bcrypt.compare(password, hash)
        if(!valid){
            return res.status(404).send('Invalid Password')
        }
        else{
            userToken=auth.generate(user)
            res.cookie('token', userToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            })
            return res.status(200).json({user:{
                userId:user._id,
                name:user.name,
                items:user.items_owned
            }})
        }
    }
    catch(e){
        console.log("error:", e)
        return res.status(500).send();
    }
    
}

const register = async(req, res)=>{
    const{name, email, password,algoAddr,algoPass} = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = new User({name:name, email:email, password:hash,algoAddr:algoAddr,algoPass:algoPass, items_owned:[], pending_trades:[], completed_trades:[]})
    const saved = await user.save()
    token=auth.generate(user)
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })
    return res.status(200).json({msg:"OK", userId:user._id}).send()
}

const logout = async(req, res)=>{
    const{userId}=req.body
    const user=await User.findOne({_id:userId})
    res.clearCookie("token")
    res.status(200).send()
}

const getCurrentUser = (req, res)=>{
    const userId=req.userId
    if(!userId){
        return res.status(404).json({msg:"No user id"})
    }
    const user=User.findOne({_id:userId}).then(data=>{
        if(!data){
            return res.status(404).json({msg:"User not found"})
        }
        return res.status(200).json({
            user:{
                userId:data._id,
                name:data.name,
                items:data.items_owned
            }
        })
    })
}
// const getUser = async(req, res)=>{
//     console.log("getting the current user")
//     const user = await User.findOne({_id:req.params.id})
//     if(user){
//         return res.status(200).json({
//             user:{
//                 userId:user._id,
//                 name:user.name,
//                 items_owned:user.items_owned
//             }
//         })
//     }
// }

const createPendingTrade = async(req, res)=>{
    const {sellerId, buyerId, itemId} = req.body
    const seller=await User.findOne({_id:sellerId})
    const buyer=await User.findOne({_id:buyerId})
    const newTrade= new Trade({
        buyer_id:buyerId,
        seller_id:sellerId,
        buyer_status:false,
        seller_status:false,
        item_id:itemId,
        isPending:true
    })
    const saved=await newTrade.save()
    seller.pending_trades.push(saved._id)
    buyer.pending_trades.push(saved._id)
    const sellerUpdate=await User.updateOne({_id:sellerId}, {pending_trades:seller.pending_trades})
    const buyerUpdate=await User.updateOne({_id:buyerId}, {pending_trades:buyer.pending_trades})
    if(!sellerUpdate || !buyerUpdate){
        return res.status(404).json({msg:"ERROR"})
    }
    return res.status(200).json({msg:"OK"})
}

const completeTrade = async(req, res)=>{
    const {tradeId}=req.body
    const trade=await Trade.findOne({_id:tradeId})
    const {buyer_id, seller_id, item_id}=trade

    const seller=await User.findOne({_id:seller_id})
    const buyer=await User.findOne({_id:buyer_id})
    const sellerAcc = algosdk.mnemonicToSecretKey(seller.algoPass)
    const buyerAcc = algosdk.mnemonicToSecretKey(buyer.algoPass)
    const target_item = await Item.findOne({_id:item_id})

    //Buyer opt in
    let params = await algodclient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    let note = undefined;
    let sender = buyerAcc.addr;
    let recipient = sender;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    assetID = target_item.asset_id
    amount = 0;
    let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, 
        recipient, 
        closeRemainderTo, 
        revocationTarget,
        amount, 
        note, 
        assetID, 
        params);
    rawSignedTxn = opttxn.signTxn(buyerAcc.sk);
    let opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    confirmedTxn = await algosdk.waitForConfirmation(algodclient, opttx.txId, 4);

    //Start algorand asset transaction
     params = await algodclient.getTransactionParams().do();
     sender = sellerAcc.addr
     recipient = buyerAcc.addr
     assetID = target_item.asset_id
     revocationTarget = undefined;
     closeRemainderTo = undefined;
     amount = 1;
    let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, 
        recipient, 
        closeRemainderTo, 
        revocationTarget,
        amount,  
        note, 
        assetID, 
        params);
    rawSignedTxn = xtxn.signTxn(sellerAcc.sk)
    let xtx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    confirmedTxn = await algosdk.waitForConfirmation(algodclient, xtx.txId, 4);

    //update the item owner and add the transaction
    // const itemTransactions = target_item.transactions
    // itemTransactions.push(tradeId)
    await Item.updateOne({_id:item_id}, {owner:buyer.name})
    //await Item.updateOne({_id:item_id}, {transactions:itemTransactions})

    //remove item from the seller
    const sellerItems=seller.items_owned
    const newSellerItems = sellerItems.filter(item => item!=item_id)
    //await User.updateOne({_id:seller_id}, {items_owned:newSellerItems})
    
    //remove pending trade from seller, add complete trade to seller
    const sellerPending=seller.pending_trades
    const newSellerPending = sellerPending.filter(trade => trade!=tradeId)
    const sellerComplete=seller.completed_trades
    sellerComplete.push(tradeId)
    //update seller account
    await User.updateOne({_id:seller_id},  {items_owned:newSellerItems, pending_trades:newSellerPending, completed_trades:sellerComplete})

    //push the item to the buyer
    const buyerItems=buyer.items_owned
    buyerItems.push(item_id)
    //await User.updateOne({_id:buyer_id}, {items_owned:buyerItems})

    //remove pending trade from buyer, add pending trade to buyer
    const buyerPending=buyer.pending_trades
    const newBuyerPending = buyerPending.filter(trade => trade!=tradeId)
    const buyerComplete=buyer.completed_trades
    buyerComplete.push(tradeId)
    //update buyer account
    await User.updateOne({_id:buyer_id}, {items_owned:buyerItems, pending_trades:newBuyerPending, completed_trades:buyerComplete})

    //update pending status for trade
    await Trade.updateOne({_id:tradeId}, {pendingStatus:false})
    return res.status(200).json({msg:"OK"})
}

const getProfileQRCode = (req, res)=>{
    const userId=req.userId
    const key=new ObjectId().toString()
    const newProfileCode = new PublicProfile({userId:userId, key:key})
    
    newProfileCode.save().then(()=>{
        const url=`/${userId}/${key}`
        QRCode.toFile(`./qrcodes/profiles/${userId}-${key}.png`, url, {
            color: {
              dark: '#000000',  
              light: '#FFFFFF'
            }
          }, function (err) {
            if (err) throw err
            console.log('done')
            const filePath=path.resolve(`./qrcodes/profiles/${userId}-${key}.png`)
            return res.sendFile(filePath, function(err){
                fs.unlinkSync(filePath)
            })
        })
    }).catch((e)=>{
        console.log("error:", e)
        return res.status(404).json({message:e.message})
    })

}

const keyVerification = (req, res, next)=>{
    const {id, key}=req.params
    PublicProfile.findOne({_id:id, key:key}).then(data => {
        if(!data){
            return res.status(404).json({message:"ERROR"})
        }
        next()
    }).catch((e) => {
        return res.status(404).json({message:e})
    })
}

const scanQrCode = (req, res)=>{
    const buffer=req.file.buffer
    Jimp.read(buffer, function(err, image) {
        if (err) {
            console.error(err);
            // TODO handle error
        }
        var qr = new QRCodeReader()
        qr.callback = function(err, value) {
            if (err) {
                console.error(err);
                // TODO handle error
            }
            console.log(value.result);
            console.log(value);
            return res.status(200).json({data:value.result})
        };
        qr.decode(image.bitmap);
    });
}

const getPendingTrades = (req, res) => {
    const {userId} = req.params;
    Trade.find({$or: [
        { buyer_id: userId },
        { seller_id: userId }
    ]}).and({isPending: true}).exec((err, results) => {
        if(err){
            return res.status(404).json({message: "ERROR"});
        }
        return results;
    });
}

const getItemInfo=(req, res) => {
    const {itemId} = req.params
    Item.findOne({_id:itemId}).then(data => {
        if(!data){
            return res.status(404).json({message:"ERROR"})
        }
        let item=data
        let assetId=item.asset_id
        let transactions=[]
        axios.get(`https://algoindexer.testnet.algoexplorerapi.io/v2/assets/${assetId}/transactions`).then((response) => {
            let data=response.data
            let assetTransactions=data.transactions
            for(let i=0;i<assetTransactions.length;i++){
                let transaction=assetTransactions[i]
                const date=transaction['round-time']
                let id=transaction.id
                if(transaction['asset-config-transaction']){
                    transactions.push({
                        transactionId:id, 
                        creator:transaction['asset-config-transaction']['params']['creator'],
                        timestamp:date
                    })
                }
                else if(transaction['asset-transfer-transaction']){
                    transactions.push({
                        transactionId:id,
                        sender:transaction['sender'],
                        receiver:transaction['asset-transfer-transaction']['receiver'],
                        timestamp:date
                    })
                }
            }
            transactions.sort((a, b)=>{
                return b.timestamp-a.timestamp
            })
            return res.status(200).json({item:{name:item.name}, transactions:transactions})
        }, (error)=>{
            return res.status(404).json({message:"ERROR"})
        })
    })
    
}

const getCompletedTrades=(req, res)=>{
    const userId=req.userId
    User.findOne({_id:userId}).then(data => {
        if(!data){
            return res.status(404).json({message:"ERROR; user is not found"})
        }
    })
}
module.exports = {
    login,
    register,
    logout,
    getCurrentUser,
    createPendingTrade,
    completeTrade,
    getProfileQRCode,
    keyVerification,
    scanQrCode,
    getItemInfo,
    getPendingTrades
}