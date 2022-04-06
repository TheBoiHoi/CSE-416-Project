const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ObjectId=mongoose.ObjectId
const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    algoAddr:{type:String, required:false},
    algoPass:{type:String, required:false},
    items_owned:{type:[String]},
    pending_trades:{type:[String]},
    completed_trades:{type:[String]}
})

module.exports=mongoose.model('User', userSchema)