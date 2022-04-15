const User=require('../models/user')
const bcrypt=require('bcrypt')
const Item = require('../models/item')
const PendingTrade=require('../models/pendingTrade')
const PublicProfile=require('../models/PublicProfile')
const auth=require('../token.js')
const ObjectId=require('bson-objectid')
const QRCode=require('qrcode')
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
            token=auth.generate(user)
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            })
            return res.status(200).json({userId:user._id}).send()
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

const getUser = async(req, res)=>{
    const user = await User.findOne({_id:req.params.id})
    if(user){
        return res.status(200).json({
            user:{
                name:user.name,
                items_owned:user.items_owned
            }
        })
    }
}

const createPendingTrade = async(req, res)=>{
    const {sellerId, buyerId, itemId} = req.body
    const seller=await User.findOne({_id:sellerId})
    const buyer=await User.findOne({_id:buyerId})
    const newTrade= new PendingTrade({
        buyer_id:buyerId,
        seller_id:sellerId,
        buyer_status:false,
        seller_status:false,
        item_id:itemId
    })
    seller.pending_trades.push(newTrade._id)
    buyer.pending_trades.push(newTrade._id)
    await User.updateOne({_id:sellerId}, {pending_trades:seller.pending_trades})
    await User.updateOne({_id:buyerId}, {pending_trades:buyer.pending_trades})
    const saved=await newTrade.save()
    if(saved){
        return res.status(200).json({msg:"OK", tradeId:newTrade._id})
    }
    return res.status(404).json({msg:"ERROR"})
}

const completeTrade = async(req, res)=>{
    const {tradeId}=req.body
    const trade=await PendingTrade.findOne({_id:tradeId})
    const {buyer_id, seller_id, item_id}=trade

    const seller=await User.findOne({_id:seller_id})
    const buyer=await User.findOne({_id:buyer_id})

    await Item.updateOne({_id:item_id}, {owner:buyer_id})

    //remove item from the seller
    const sellerItems=seller.items_owned
    sellerItems.filter(item => item!=item_id)
    

    //remove pending trade from seller, add complete trade to seller
    const sellerPending=seller.pending_trades
    sellerPending.filter(trade => trade!=tradeId)
    const sellerComplete=seller.completed_trades
    sellerComplete.push(tradeId)
    await User.updateOne({_id:seller_id}, {items_owned:sellerItems, pending_trades:sellerPending, completed_trades:sellerComplete})

    //push the item to the buyer
    const buyerItems=buyer.items_owned
    buyerItems.push(item_id)

    //remove pending trade from buyer, add pending trade to buyer
    const buyerPending=buyer.pending_trades
    buyerPending.filter(trade => trade!=tradeId)
    const buyerComplete=buyer.completed_trades
    buyerComplete.push(tradeId)
    await User.updateOne({_id:buyer_id}, {items_owned:buyerItems, pending_trades:buyerPending, completed_trades:buyerComplete})
    return res.status(200).json({msg:"OK"})
}

const generateProfileQRCode = (req, res)=>{
    const {userId} = req.body
    const key=new ObjectId().toString()
    const newProfileCode = new PublicProfile({userId:userId, key:key})
    
    newProfileCode.save().then(()=>{
        const url=`/${userId}/${key}`
        QRCode.toFile(`./qrcodes/profiles/${userId}-${key}.png`, url, {
            color: {
              dark: '#000000',  // Blue dots
              light: '#FFFFFF' // Transparent background
            }
          }, function (err) {
            if (err) throw err
            console.log('done')
        })
        return res.sendStatus(200)
    }).catch((e)=>{
        console.log("error:", e)
        return res.status(404).json({message:e.message})
    })

}

module.exports = {
    login,
    register,
    logout,
    getUser,
    createPendingTrade,
    completeTrade,
    generateProfileQRCode
}