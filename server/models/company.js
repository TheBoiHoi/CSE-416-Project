const mongoose=require('mongoose')
const Schema=mongoose.Schema
const companySchema=new Schema({
    email:{type:String, required:true},
    name:{type:String, required:true},
    password:{type:String, required:true},
    items:{type:[String], required:true}
})

module.exports=mongoose.model('Company', companySchema)