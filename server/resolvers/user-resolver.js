const User=require('../models/user')
const Company=require('../models/company')
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
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
const port = '';

//Didn't use random because it generate a different key and iv if the sever crash
const crypto = require('crypto');
const algorithm = 'aes-192-cbc'; //Using AES encryption
const key = crypto.scryptSync("generate key","salt",24)
const iv = Buffer.alloc(16,0)

require('dotenv').config()
const {TOKEN}=process.env
const apitoken = {
    'X-API-Key': TOKEN
}
const axios=require('axios')
const algodclient = new algosdk.Algodv2(apitoken, baseServer, port);

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
            userToken=auth.generate(user, false)
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
    //encrypted algoPass
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(algoPass, "utf-8", "hex");
    encrypted += cipher.final("hex");
    (async ()=>{
        const walletId = "6279b484a74732a8bcdc86ad";
        const walletCompany=await Company.findOne({_id:walletId});
        let encryptedText = walletCompany.algoPass;
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        const walletCompanyAcc = algosdk.mnemonicToSecretKey(decryptedData);
        let accountInfo = await algodclient.accountInformation(walletCompanyAcc.addr).do();
        console.log("Wallet Account balance: %d microAlgos", accountInfo.amount);
        let params = await algodclient.getTransactionParams().do();
        let txn = algosdk.makePaymentTxnWithSuggestedParams(walletCompanyAcc.addr, algoAddr, 1000000, undefined, undefined, params);
        let rawSignedTxn = txn.signTxn(walletCompanyAcc.sk)
        let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
        const ptx = await algosdk.waitForConfirmation(algodclient, tx.txId, 4);
        console.log("Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]);
        let newAccountInfo = await algodclient.accountInformation(algoAddr).do();
        console.log("New Account balance: %d microAlgos", newAccountInfo.amount);
    })().catch(e=>{
        console.log(e);
        return res.status(404).json({"message":"err"})
    })
    const hash = await bcrypt.hash(password, 10)
    const user = new User({name:name, email:email, password:hash,algoAddr:algoAddr,algoPass:encrypted, items_owned:[], pending_trades:[], completed_trades:[]})
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
    console.log("logging out")
    res.clearCookie("token")
    res.sendStatus(200)
}

const getCurrentUser = (req, res)=>{
    const userId=req.userId
    if(!userId){
        return res.status(404).json({msg:"No user id"})
    }
    User.findOne({_id:userId}).then(data=>{
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

const getUserById=(req, res)=>{
    
    const userId=req.params.userId
    console.log("getting user by id, the id is:", userId )
    User.findOne({_id:userId}).then(data=>{
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

    //Decrypted Buyer and Seller algo pass
    var decipher = crypto.createDecipheriv(algorithm, key, iv);
    
    let sellerEncryptedText = seller.algoPass
    let sellerDecryptedData = decipher.update(sellerEncryptedText, "hex", "utf-8");
    sellerDecryptedData += decipher.final("utf8");
    
    decipher = crypto.createDecipheriv(algorithm, key, iv);

    let BuyerencryptedText = buyer.algoPass
    let BuyerdecryptedData = decipher.update(BuyerencryptedText, "hex", "utf-8");
    BuyerdecryptedData += decipher.final("utf8");

    const sellerAcc = algosdk.mnemonicToSecretKey(sellerDecryptedData)
    const buyerAcc = algosdk.mnemonicToSecretKey(BuyerdecryptedData)
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
    const newProfileCode = new PublicProfile({userId:userId, key:key, expireAt:Date.now()})
    
    newProfileCode.save().then(()=>{
        const url=`/${userId}/${key}`
        QRCode.toFile(`./images/${userId}-${key}.png`, url, {
            color: {
              dark: '#000000',  
              light: '#FFFFFF'
            }
          }, function (err) {
            if (err) throw err
            console.log('done')
            const filePath=path.resolve(`./images/${userId}-${key}.png`)
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
    const {userId, key}=req.params
    PublicProfile.findOne({userId:userId, key:key}).then(data => {
        if(!data){
            return res.status(404).json({message:"ERROR"})
        }
        req.userId=userId
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


const getCompletedTrades=(req, res)=>{
    const userId=req.userId
    User.findOne({_id:userId}).then(async (data) => {
        if(!data){
            return res.status(404).json({message:"ERROR; user is not found"})
        }
        const algoAddr=data.algoAddr
        axios.get(`https://algoindexer.testnet.algoexplorerapi.io/v2/accounts/${algoAddr}/transactions`).then(async (response)=>{
            let data=response.data
            let transactions=data.transactions
            let ret=[]
            for(let i=0;i<transactions.length;i++){
                let transaction=transactions[i]
                if(transaction['asset-transfer-transaction']){
                    receiverAlgoId=transaction['asset-transfer-transaction']['receiver']
                    senderAlgoId=transaction['sender']
                    itemAssetId=transaction['asset-transfer-transaction']['asset-id']

                    let receiver=await User.findOne({algoAddr:receiverAlgoId})
                    let sender=await User.findOne({algoAddr:senderAlgoId})
                    let item=await Item.findOne({asset_id:itemAssetId})

                    ret.push({
                        txid:transaction['id'],
                        receiverName:receiver.name,
                        senderName:sender.name,
                        receiverId:receiver._id,
                        senderId:sender._id,
                        item:item.name,
                        itemId:item._id,
                        date:new Date(transaction['round-time']*1000).toLocaleString('en-US')
                    })
                }
            }
            return res.status(200).json({transactions:ret})
        }).catch((e)=>{
            console.log("ERROR:", e)
        })
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
    getPendingTrades,
    getCompletedTrades,
    getUserById,
}