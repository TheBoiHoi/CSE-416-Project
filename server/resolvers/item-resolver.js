const Item=require('../models/item')
const User=require('../models/user')
const QRCode=require('qrcode')
const algosdk=require('algosdk')
const fs=require('fs')
const path=require('path')
require('dotenv').config()
const baseServer = 'https://testnet-algorand.api.purestake.io/idx2'
const port = '';
const {TOKEN}=process.env
const apitoken = {
    'X-API-key':TOKEN
}
const indexerClient = new algosdk.Indexer(apitoken, baseServer, port);
const getItemInfo=(req, res) => {
    const {itemId} = req.params
    console.log("get item info id:", itemId)
    Item.findOne({_id:itemId}).then(data => {
        if(!data){
            return res.status(404).json({message:"ERROR"})
        }
        let item=data
        return res.status(200).json({item:
            {owner:item.owner, 
            itemId:item._id, 
            name:item.name, 
            serialNumber:item.serial_number, 
            asset_id:item.asset_id, 
            manu_date:item.manu_date,
            manu_location:item.manu_location,
            manu_owner:item.manu_owner
         } })
    })
}

const generateItemQRCode = async(req, res)=>{
    const {itemId} = req.body
    const url=`http://localhost:8000/item/profile/${itemId}`
    QRCode.toFile(`./images/item-qrcodes/${itemId}.png`, url, {
        color: {
          dark: '#000000',  // Blue dots
          light: '#FFFFFF' // Transparent background
        }
      }, function (err) {
        if (err) throw err
        console.log('done')
    })
    res.status(200).json({status:"ok"})
}

const getItemTransactions=(req, res)=>{
    const {itemId}=req.params
    Item.findOne({_id:itemId}).then(async(data) => {
        if(!data){
            return res.status(404).json({message:"ERROR; item not found"})
        }
        let item=data
        let assetId=item.asset_id
        indexerClient.lookupAssetTransactions(assetId).do().then(async (data)=>{
            let transactions=[]
            let assetTransactions=data.transactions
            for(let i=0;i<assetTransactions.length;i++){
                let transaction=assetTransactions[i]
                const date=new Date(transaction['round-time']*1000).toLocaleString('en-US')
                let id=transaction.id
                // if(transaction['asset-config-transaction']){
                //     transactions.push({
                //         transactionId:id, 
                //         creator:transaction['asset-config-transaction']['params']['creator'],
                //         timestamp:date
                //     })
                // }
                if(transaction['asset-transfer-transaction']){
                    let senderAlgoId=transaction['sender']
                    let receiverAlgoId=transaction['asset-transfer-transaction']['receiver']
                    let sender=await User.findOne({algoAddr:senderAlgoId})
                    let receiver=await User.findOne({algoAddr:receiverAlgoId})
                    transactions.push({
                        transactionId:id,
                        senderId:sender._id,
                        receiverId:receiver._id,
                        sender:sender.name,
                        receiver:receiver.name,
                        date:date
                    })
                }
            }
            return res.status(200).json({transactions:transactions.reverse()})
        })
    })

}

//upload the profile pic of an item to the server
const uploadProfilePic=(req, res)=>{
    const {itemId}=req.params
    const file=req.file
    const image=req.file.buffer
    fs.writeFile(`./images/profile-pics/${file.originalname}`, image, 'base64', function(err){
        if (err) throw err
        console.log('File saved.')
    })
    Item.updateOne({_id:itemId}, {profilePic:file.originalname}).then(data=>{
        return res.status(200).json({message:"OK", newPath:file.originalname})
    })
}


// //get the profile pic of an item
const getProfilePic=(req, res)=>{
    const {itemId}=req.params
    console.log("getprofilepic itemid:", itemId)
    Item.findOne({_id:itemId}).then(data=>{
        let imagePath=path.resolve(`./images/profile-pics/${data.profilePic}`)
        console.log()
        return res.sendFile(imagePath)
    }).catch((e)=>{
        console.log(e)
        return res.status(404).json({message:"ERROR"})
    })
}

module.exports={
    getItemInfo,
    generateItemQRCode,
    getItemTransactions,
    uploadProfilePic,
    getProfilePic
}