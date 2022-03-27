const Company=require('../models/company')
const bcrypt=require('bcrypt')
const Item=require('../models/item')
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

const addItem = async(req, res)=>{
    const {id, item}=req.body
    const company=await Company.findOne({_id:id})
    const items=company.items
    console.log("serial number:", item.serial_number)
    const newItem=new Item({
        name:item.name,
        owner:item.owner,
        transactions:[],
        asset_id:item.asset_id,
        serial_number:item.serial_number,
        manu_date:item.manu_date,
        manu_location:item.manu_location,
        manu_owner:item.manu_owner
    })
    items.push(newItem.serial_number)
    console.log("new item serial number", newItem.serial_number)
    await newItem.save()
    const saved=await Company.updateOne({_id:id}, {items:items})
    if(saved){
        return res.status(200).json({"message":"OK"})
    }
    return res.status(404).json({"message":"ERROR"})
}

module.exports={
    register,
    login,
    getCompany,
    addItem
}