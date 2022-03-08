const User=require('../models/user')

const login = async(req, res)=>{
    console.log("I am trying to log you in")
    const {email, password} = req.body
    const user = await User.findOne({email:email, password:password})
    if(user!=null){
        return res.status(200).json({user:user}).send()
    }
    else{
        return res.status(404).send()
    }
}

const register = async(req, res)=>{
    const{email, password} = req.body
    const user = new User({email:email, password:password})
    const saved = await user.save()
    res.status(200).json({user:{
        email:saved.email,
        password:saved.password
    }})
}

module.exports = {
    login,
    register
}