const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const user =require('./resolvers/user-resolver')
const UserSchema=require('./models/user')
const CompanySchema=require('./models/company')
const company=require('./resolvers/company-resolver')
const auth=require('./token.js')
const cookieParser = require('cookie-parser')
const multer=require('multer')
require('dotenv').config()
const {MONGO_URI}=process.env
PORT=3000
mongoose.connect(MONGO_URI).then(()=>{
    console.log("sucessfully connect to db")
})
.catch(e => {
    console.error('Connection error', e.message)
})

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:8000",
    credentials: true
}))

app.use(function(req, res, next){
    res.set("Access-Control-Allow-Origin", req.headers.origin);
    res.set("Access-Control-Allow-Credentials", true);
	next();
})
app.use(cookieParser())
app.use(express.json())

app.get(`/user/get`, auth.verify, (req, res)=>{
    const userId=req.userId
    const isCompany=req.isCompany
    if(!userId){
        return res.status(404).json({msg:"No user id"})
    }
    
    //check if the logged in user is a regular user, yes, do this block
    if(!isCompany){
        UserSchema.findOne({_id:userId}).then(data=>{
            if(!data){
                return res.status(404).json({msg:"User not found"})
            }
            return res.status(200).json({
                user:{
                    userId:data._id,
                    name:data.name,
                    items:data.items_owned,
                    isCompany:false
                }
            })
        })
    }

    else{//no? do this block
        CompanySchema.findOne({_id:userId}).then((data)=>{
            if(!data){
                return res.status(404).json({msg:"Company not found"})
            }

            return res.status(200).json({
                company:{
                    companyId:data._id,
                    name:data.name,
                    items:data.items,
                    isCompany:true
                }
            })
        })
            
    }
    
})

app.post('/user/register', user.register)
app.post('/user/login', user.login)
app.post('/user/logout', auth.verify, user.logout)
app.get('/user/get/:userId/:key', user.keyVerification, user.getUserById)


app.get('/item/get/:itemId', user.getItemInfo)
app.get('/item-transactions/get/:itemId', user.getItemTransactions)
app.get('/pending-trade/get', user.getPendingTrades)
app.post('/trade/create',auth.verify, user.createPendingTrade)
app.post('/trade/complete', auth.verify, user.completeTrade)
app.get('/completed-trade/get', auth.verify, user.getCompletedTrades)
app.get('/completed-trade/get/:userId/:key', user.keyVerification, user.getCompletedTrades)
app.post('/profile-pic/upload/:itemId', multer().single('file'), user.uploadProfilePic)
app.get('/profile-pic/get/:itemId', user.getProfilePic)

app.post('/company_register', company.register)
app.post('/company_login', company.login)
app.get(`/company`, auth.verify, company.getCompany)
app.get(`/inventory/:id`, auth.verify, company.getCompany)
app.post('/company/createItem', company.createItem)
app.post('/company/sellItem', company.sellItem)
app.post('/company_addItem', auth.verify, company.addItem)
app.post('/generate/qrcode/item', company.generateItemQRCode)
app.get('/qrcode/item/:itemId', (req, res)=>{
    const itemId=req.params.itemId
    return res.sendFile(__dirname+`/qrcodes/${itemId}.png`)
})
app.get('/qrcode/profile/:userId', user.getProfileQRCode)
app.post('/qrcode/scan', multer().single('file'), user.scanQrCode)
app.listen(PORT, ()=>{console.log(`app is listening in ${PORT}`)})