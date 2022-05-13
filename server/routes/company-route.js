const company=require('../resolvers/company-resolver')
const auth=require('../common/token')
const express=require('express')
const router=express.Router()

router.post('/register', company.register)
router.post('/login', company.login)
router.get(`/inventory/:id`, auth.verify, company.getCompany)
router.post('/createItem', company.createItem)
router.post('/sellItem', company.sellItem)

module.exports=router