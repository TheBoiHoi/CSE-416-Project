const User=require('../models/user')
const bcrypt=require('bcrypt')

const login = async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email:email})
    if(user==null){
        return res.status(404).send()
    }
    const hash=user.password
    const valid = await bcrypt.compare(password, hash)
    if(!valid){
        return res.status(404).send('Invalid Password')
    }
    else
        return res.status(200).json({user:user}).send()
}

const register = async(req, res)=>{
    const{name, email, password} = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = new User({name:name, email:email, password:hash, items_owned:[], pending_trades:[], completed_trades:[]})
    const saved = await user.save()
    res.status(200).json({user:{
        _id:saved._id,
        name:saved.name
    }})
}

const getUser = async(req, res)=>{
    console.log("request", req.params.id)
    const user = await User.findOne({_id:req.params.id})
    if(user){
        return res.status(200).json({
            user:user
        })
    }
    
}

module.exports = {
    login,
    register,
    getUser
}