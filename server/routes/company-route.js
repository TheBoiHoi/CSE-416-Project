const company=require('../resolvers/company-resolver')
const auth=require('../common/token')
const express=require('express')
const router=express.Router()

router.post('/register', company.register)
router.post('/login', company.login)
router.post('/createItem', auth.verify, company.createItem)
router.post('/sellItem', auth.verify, company.sellItem)

module.exports=router