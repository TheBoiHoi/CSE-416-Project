const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const user =require('./resolvers/user-resolver')
const company=require('./resolvers/company-resolver')
const auth=require('./token.js')
const cookieParser = require('cookie-parser')
const multer=require('multer')
PORT=3000
mongoose.connect('mongodb+srv://deeznut:arminarlert@cluster0.sxhpz.mongodb.net/cse416?retryWrites=true&w=majority')

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
app.post('/user_register', user.register)
app.post('/user_login', user.login)
app.post('/user_logout', auth.verify, user.logout)
app.get(`/user_profile/:id`, auth.verify, user.getUser)

app.get('user/profile/public/:id/:key', user.keyVerification, user.getUser)
app.get('/get/item/:itemId', user.getItemInfo)
app.post('/create_trade',auth.verify, user.createPendingTrade)
app.post('/complete_trade', auth.verify, user.completeTrade)

app.post('/company_register', company.register)
app.post('/company_login', company.login)
app.get(`/inventory/:id`, auth.verify, company.getCompany)
app.post('/company_createItem', company.createItem)
app.post('/company_sellItem', company.sellItem)
app.post('/company_addItem', auth.verify, company.addItem)
app.post('/generate/qrcode/item', company.generateItemQRCode)
app.get('/qrcode/item/:itemId', (req, res)=>{
    const itemId=req.params.itemId
    return res.sendFile(__dirname+`/qrcodes/${itemId}.png`)
})
app.get('/qrcode/profile/:userId', user.getProfileQRCode)
app.post('/qrcode/scan', multer().single('file'), user.scanQrCode)
app.listen(PORT, ()=>{console.log(`app is listening in ${PORT}`)})