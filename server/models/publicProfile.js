const mongoose=require('mongoose')

const publicProfileSchema=new mongoose.Schema({
    userId:{type:String, require:true},
    key:{type:String, require:true},
    createdAt:{type:Date, expires:'1d', default: Date.now}
})

module.exports=mongoose.model("PublicProfile", publicProfileSchema)