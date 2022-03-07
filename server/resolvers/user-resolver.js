const User=require('../models/user')

const login = async(req, res)=>{
    const {email, password} = req.body

}

const register = async(req, res)=>{
    console.log("hello")
    const{email, password} = req.body
    const user = new User({email:email, password:password})
    const saved = await user.save()
    res.status(200).json({user:{
        email:saved.email,
        password:saved.password
    }})
}

module.exports = {
    register
}