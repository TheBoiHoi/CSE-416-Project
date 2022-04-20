const mongoose=require('mongoose')
const Schema=mongoose.Schema
const tradeSchema=new Schema({
    buyer_id:{type:String, required:true},
    seller_id:{type:String, required:true},
    buyer_status:{type:Boolean, required:true},
    seller_status:{type:Boolean, required:true},
    item_id:{type:String, required:true},
    isPending:{type:Boolean, required:true}
})

module.exports=mongoose.model('PendingTrade', tradeSchema)