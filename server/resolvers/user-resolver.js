const User=require('../models/user')
const bcrypt=require('bcrypt')
const Item = require('../models/item')
const Trade=require('../models/trade')
const PublicProfile=require('../models/publicProfile')
const auth=require('../common/token.js')
const ObjectId=require('bson-objectid')
const QRCode=require('qrcode')
const QRCodeReader=require('qrcode-reader')
const fs=require('fs')
const path=require('path')
const Jimp=require('jimp')
const {parseTransactions, fundAccount,itemOptIn, tradeItem} =require('../common/algoUtils')
const algosdk = require('algosdk');

//Didn't use random because it generate a different key and iv if the sever crash
const crypto = require('crypto');
const algorithm = 'aes-192-cbc'; //Using AES encryption
const key = crypto.scryptSync("generate key","salt",24)
const iv = Buffer.alloc(16,0)

require('dotenv').config()
const axios=require('axios')

const baseServer = 'https://testnet-algorand.api.purestake.io/idx2'
const port = '';
const {TOKEN}=process.env
const apitoken = {
    'X-API-key':TOKEN
}
const indexerClient = new algosdk.Indexer(apitoken, baseServer, port);

const login = async(req, res)=>{
    console.log("login")
    try{
        const {email, password} = req.body
        const user = await User.findOne({email:email})
        if(user==null){
            return res.status(404).send()
        }
        const hash=user.password
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
                items:user.items_owned,
                isCompany:false
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
        await fundAccount(algoAddr)
    })().catch(e=>{
        console.log(e);
        return res.status(404).json({"message":"err"})
    })

    const hash = await bcrypt.hash(password, 10)
    const user = new User({
        name:name, 
        email:email,
        password:hash,
        algoAddr:algoAddr,
        algoPass:encrypted, 
        items_owned:[], 
        pending_trades:[], 
        completed_trades:[],
        profilePic:"duckpfp.png"
    })
    const saved = await user.save()
    token=auth.generate(user)
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })
    return res.status(200).json({msg:"OK", user:{
        userId:saved._id,
        name:saved.name,
        items:saved.items_owned,
        isCompany:false
    }})
}

const logout = async(req, res)=>{
    console.log("logging out")
    res.clearCookie("token")
    res.sendStatus(200)
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
    if(sellerId==buyerId){
        return res.status(404).json({message:"ERROR; You cannot trade with yourself"})
    }
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

const updateTrade = async(req, res) => {
    const {tradeId, userId} = req.body;
    const trade = await Trade.findOne({_id: tradeId});
    if(userId == trade.buyer_id){
        trade.buyer_status = true;
    }else if(userId == trade.seller_id){
        trade.seller_status = true;
    }
    trade.save().then((data, err) => {
        if (err){
            res.status(404).json({message: "ERROR"});
        }
        if(data){
            res.status(200).send(trade);
        }
    });
}

const cancelTrade = async (req, res) => {
    const { tradeId } = req.body;
    const trade = await Trade.findOne({ _id: tradeId });
    const { buyer_id, seller_id } = trade;

    const seller = await User.findOne({ _id: seller_id });
    const buyer = await User.findOne({ _id: buyer_id });

    console.log(buyer, seller)

    const sellerPendings = seller.pending_trades;
    const buyerPendings = buyer.pending_trades;
    //remove from seller and buyer pending trades list
    const sellerTradeIndex = sellerPendings.indexOf(tradeId);
    console.log("SELLER INDEX: ", sellerTradeIndex)
    if (sellerTradeIndex > -1) {
        sellerPendings.splice(sellerTradeIndex, 1);
    }
    const buyerTradeIndex = buyerPendings.indexOf(tradeId);
    console.log("BUYER INDEX: ", buyerTradeIndex)
    if (buyerTradeIndex > -1) {
        buyerPendings.splice(buyerTradeIndex, 1);
    }

    seller.pending_trades = sellerPendings;
    buyer.pending_trades = buyerPendings;
    await seller.save();
    await buyer.save();
    const data = await Trade.deleteOne({ _id: tradeId });
    console.log(data);
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
    
    try{
    assetID = target_item.asset_id;
    await itemOptIn(buyerAcc,assetID)
    await tradeItem(sellerAcc,buyerAcc,assetID)

    }catch(e){
        console.log(e);
        trade.buyer_status = false;
        trade.seller_status = false;
        trade.save();
        return res.status(200).json({message:"Error"})
    }

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
        const url=`http://localhost:8000/public-profile/${userId}/${key}`
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

const getPendingTrades = async (req, res) => {
    const {userId} = req.params;

    const user = await User.findOne({_id: userId});
    const pendingTrades = user.pending_trades
    const pendingList = []
    for(const tradeId of pendingTrades){
        const trade = await Trade.findOne({_id: tradeId})
        pendingList.push(trade)
    }
    res.status(200).send(pendingList)
}

const getCompletedTrades=(req, res)=>{
    const userId=req.userId
    User.findOne({_id:userId}).then(async (data) => {
        if(!data){
            return res.status(404).json({message:"ERROR; user is not found"})
        }
        const algoAddr=data.algoAddr
        indexerClient.searchForTransactions().address(algoAddr).do().then(async (data)=>{
            let transactions=data.transactions
            let ret=await parseTransactions(transactions)
            return res.status(200).json({transactions:ret})
        }).catch((e)=>{
            console.log("ERROR:", e)
        })
    })
}

const uploadProfilePic=(req, res)=>{
    const userId=req.userId
    const file=req.file
    const image=req.file.buffer
    fs.writeFile(`./images/user-profile-pics/${file.originalname}`, image, 'base64', function(err){
        if(err) throw err
        console.log('User profile picture saved')
    })
    User.updateOne({_id:userId}, {profilePic:file.originalname}).then(data=>{
        return res.status(200).json({message:"OK", newPath:file.originalname})
    })
}

const getProfilePic=(req, res)=>{
    const userId=req.params.userId
    User.findOne({_id:userId}).then(data=>{
        let imagePath
        if(data.profilePic){
            imagePath=path.resolve(`./images/user-profile-pics/${data.profilePic}`)
        }
        else{
            imagePath=path.resolve(`./images/user-profile-pics/duckpfp.png`)
        }
        return res.sendFile(imagePath)
    }).catch((e)=>{
        console.log("There is an error", e)
        return res.status(404).json({message:"some ERROR has happened"})
    })
}

const changePassword=async (req, res)=>{
    const userId=req.userId
    const {originalPassword, newPassword} =req.body
    const user=await User.findOne({_id:userId})
    const valid=await bcrypt.compare(originalPassword, user.password)
    if(!valid){
        return res.status(404).json({message:"ERROR: invalid password"})
    }

    //hashing the new password
    const hash=await bcrypt.hash(newPassword, 10)
    const saved=await User.updateOne({_id:userId}, {password:hash})
    if(saved){
        return res.status(200).json({message:"password has successfully changed"})
    }

    return res.status(404).json*{message:"Something went wrong; password has NOT successfully changed"}
}

module.exports = {
    login,
    register,
    logout,
    createPendingTrade,
    completeTrade,
    updateTrade, 
    cancelTrade,
    getProfileQRCode,
    keyVerification,
    scanQrCode,
    getPendingTrades,
    getCompletedTrades,
    getUserById,
    uploadProfilePic,
    getProfilePic,
    changePassword
}