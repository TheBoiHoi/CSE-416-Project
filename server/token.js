const jwt = require("jsonwebtoken");
require('dotenv').config();
const { JWT_SECRET } = process.env;

const verify = (req, res, next) =>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(404).json({"msg":"ERROR, no token"})
        }
        
        const verified=jwt.verify(token, JWT_SECRET)
        req.userId=verified.userId;
        next()
    }

    catch(err){
        console.log(err)
        return res.status(404).json({msg:"ERROR"})
    }
}

const generate = (user) => {
    const ret=jwt.sign({userId:user._id}, JWT_SECRET)
    return ret
}
module.exports = {verify, generate}