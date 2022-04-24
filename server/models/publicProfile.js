const mongoose=require('mongoose')

const publicProfileSchema=new mongoose.Schema({
    userId:{type:String, require:true},
    key:{type:String, require:true},
    expire_at: {type: Date, default: Date.now, expires: 86400} 
})

module.exports=mongoose.model("PublicProfile", publicProfileSchema)