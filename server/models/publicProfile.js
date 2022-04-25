const mongoose=require('mongoose')

const publicProfileSchema=new mongoose.Schema({
    userId:{type:String, require:true},
    key:{type:String, require:true},
    expireAt: { type: Date,  expires: 86400 }
}, {timestamp:true})

//publicProfileSchema.index({createdAt:1}, { expireAfterSeconds: 86400 })
module.exports=mongoose.model("PublicProfile", publicProfileSchema)