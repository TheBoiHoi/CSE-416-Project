const mongoose=require('mongoose')
const Schema=mongoose.Schema
const itemSchema=new Schema({
    name:{type:String, required:true},
    asset_id:{type:Number, required:true},
    owner:{type:String, required:true},
    //transactions:{type:[String], required:true},
    serial_number:{type:Number, required:true},
    
    manu_date:{type:String, required:true},
    manu_location:{type:String, required:true},
    manu_owner:{type:String, required:true},
    profilePic:{type:String}
})

module.exports=mongoose.model('Item', itemSchema)