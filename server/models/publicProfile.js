const mongoose=require('mongoose')

const publicProfileSchema=new mongoose.Schema({
    userId:{type:String, require:true},
    key:{type:String, require:true},
    createdAt:{type:Date, expires:3600, default: Date.now}
})

module.exports=mongoose.model("PublicProfile", publicProfileSchema)