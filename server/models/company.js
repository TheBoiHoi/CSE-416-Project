const mongoose=require('mongoose')
const Schema=mongoose.Schema
const companySchema=new Schema({
    email:{type:String, required:true},
    name:{type:String, required:true},
    password:{type:String, required:true},
    items:{type:[String], required:true},
    algoAddr:{type:String, required:false},
    algoPass:{type:String, required:false}
})

module.exports=mongoose.model('Company', companySchema)