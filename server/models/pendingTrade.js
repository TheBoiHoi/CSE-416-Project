const mongoose=require('mongoose')
const Schema=mongoose.Schema
const pendingTradeSchema=new Schema({
    trade_id:{type:String, required:true},
    buyer_id:{type:String, required:true},
    seller_id:{type:String, required:true},
    buyer_status:{type:Boolean, required:true},
    seller_status:{type:Boolean, requried:true},
    item_id:{type:String, required:true}
})

module.exports=mongoose.model('PendingTrade', pendingTradeSchema)