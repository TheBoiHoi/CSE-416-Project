const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ObjectId=mongoose.ObjectId
const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    algoAddr:{type:String, required:true},
    algoPass:{type:String, required:true},
    items_owned:{type:[String]},
    pending_trades:{type:[String]},
    completed_trades:{type:[String]}
}, {timestamp:true})

module.exports=mongoose.model('User', userSchema)