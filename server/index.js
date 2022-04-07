const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const user =require('./resolvers/user-resolver')
const company=require('./resolvers/company-resolver')
const auth=require('./token.js')
const cookieParser = require('cookie-parser')
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
app.get(`/user_profile/:id`, auth.verify, user.getUser)
app.post('/company_register', company.register)
app.post('/company_login', company.login)
app.get(`/inventory/:id`, company.getCompany)
app.post('/company_addItem', company.addItem)
app.listen(PORT, ()=>{console.log(`app is listening in ${PORT}`)})