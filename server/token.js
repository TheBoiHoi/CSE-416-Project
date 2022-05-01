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
        console.log("verified:", verified)
        req.userId=verified.acctId;//userId here can be company id or regular user id
        req.isCompany=verified.isCompany//does this account belong to a company or a regular user
        next()
    }

    catch(err){
        console.log(err)
        return res.status(404).json({msg:"ERROR"})
    }
}

const generate = (acct, isCompany) => {
    const ret=jwt.sign({acctId:acct._id, isCompany:isCompany}, JWT_SECRET)
    return ret
}
module.exports = {verify, generate}