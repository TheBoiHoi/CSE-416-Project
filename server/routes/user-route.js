const user=require('../resolvers/user-resolver')
const auth=require('../common/token')
const multer=require('multer')
const express=require('express')
const router=express.Router()

router.post('/register', user.register)
router.post('/login', user.login)
router.post('/logout', auth.verify, user.logout)
router.get('/get/:userId/:key', user.keyVerification, user.getUserById)
route.get('/public/get/:userId', user.getUserById)
router.get('/qrcode/profile', auth.verify, user.getProfileQRCode)
router.post('/qrcode/scan', multer().single('file'), user.scanQrCode)

router.get('/pending-trade/get/:userId', auth.verify, user.getPendingTrades)
router.post('/trade/create',auth.verify, user.createPendingTrade)
router.post('/trade/complete', auth.verify, user.completeTrade)
router.post('/trade/update-status', auth.verify, user.updateTrade)
router.get('/completed-trade/get', auth.verify, user.getCompletedTrades)
router.get('/completed-trade/get/:userId/:key', user.keyVerification, user.getCompletedTrades)

router.post('/profile-pic/upload', multer().fields('file'), user.uploadProfilePic)
router.get('/profile-pic/get/:userId', user.getProfilePic)
module.exports=router