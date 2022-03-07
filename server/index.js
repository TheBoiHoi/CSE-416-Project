const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const {register}=require('./resolvers/user-resolver')
PORT=3000
mongoose.connect('mongodb+srv://deeznut:arminarlert@cluster0.sxhpz.mongodb.net/cse416?retryWrites=true&w=majority')

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.post('/register', register)
console.log("hello")
app.listen(PORT, ()=>{console.log(`app is listening in ${PORT}`)})