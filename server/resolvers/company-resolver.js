const Company=require('../models/company')
const bcrypt=require('bcrypt')

const login=async(req, res)=>{
    const {email, password}=req.body
    const company=await Company.findOne({email:email})
    if(!company){
        return res.status(404).send()
    }

    const hash=company.password
    const valid=await bcrypt.compare(password, hash)
    if(!valid){
        return res.status(404).send('Invalid Password')
    }
    else
        return res.status(200).json({user:user}).send()
}

const register = async(req, res)=>{
    const{name, email, password} = req.body
    const hash = await bcrypt.hash(password, 10)
    const company = new Company({name:name, email:email, password:hash, items:[]})
    const saved = await company.save()
    res.status(200).json({company:{
        _id:saved._id,
        name:saved.name
    }})
}

const getCompany = async(req, res)=>{
    const company = await Company.findOne({_id:req.params.id})
    if(company){
        return res.status(200).json({
            company:{
                name:company.name,
                items:company.items
            }
        })
    }
    
}

module.exports={
    register,
    login,
    getCompany
}