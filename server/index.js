const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const UserSchema=require('./models/user')
const CompanySchema=require('./models/company')
const company=require('./resolvers/company-resolver')
const item=require('./resolvers/item-resolver')
const auth=require('./common/token')
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

app.use('/user', require('./routes/user-route'))
app.use('/company', require('./routes/company-route'))

//the rest of the routes are all item related
app.get('/item/get/:itemId', item.getItemInfo)
app.get('/item-transactions/get/:itemId', item.getItemTransactions)
app.post('/profile-pic/upload/:itemId', auth.verify, multer().single('file'), item.uploadProfilePic)
app.get('/profile-pic/get/:itemId', item.getProfilePic)
app.get('/item/qrcode/:itemId', (req, res)=>{
    const itemId=req.params.itemId
    return res.sendFile(__dirname+`/images/item-qrcodes/${itemId}.png`)
})

app.listen(PORT, ()=>{console.log(`app is listening in ${PORT}`)})

