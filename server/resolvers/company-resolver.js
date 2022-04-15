const Company=require('../models/company')
const bcrypt=require('bcrypt')
const Item=require('../models/item')
const QRCode=require('qrcode')
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
    else{
        token=auth.generate(company)
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            })
            return res.status(200).json({companyId:company._id}).send()
    }
}

const register = async(req, res)=>{
    const{name, email, password} = req.body
    const hash = await bcrypt.hash(password, 10)
    const algosdk = require('algosdk');
    let account = algosdk.generateAccount();
    let passphrase = algosdk.secretKeyToMnemonic(account.sk);
    console.log( "My address: " + account.addr );
    console.log( "My passphrase: " + passphrase );
    const company = new Company({name:name, email:email, password:hash, items:[],algoAddr:account.addr,algoPass:passphrase})
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

const generateQRCode = async(req, res)=>{
    QRCode.toFile('../qrcodes/temp.png', 'www.google.com', {
        color: {
          dark: '#000000',  // Blue dots
          light: '#FFFFFF' // Transparent background
        }
      }, function (err) {
        if (err) throw err
        console.log('done')
    })
    res.end()
}

module.exports={
    register,
    login,
    getCompany,
    addItem,
    generateQRCode
}