const Item=require('../models/item')
const User=require('../models/user')
const algosdk=require('algosdk')
const fs=require('fs')
const path=require('path')
const {parseTransactions}=require('../common/algoUtils')
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

const getItemTransactions=(req, res)=>{
    const {itemId}=req.params
    Item.findOne({_id:itemId}).then(async(data) => {
        if(!data){
            return res.status(404).json({message:"ERROR; item not found"})
        }
        let item=data
        let assetId=item.asset_id
        let ret=[]
        indexerClient.lookupAssetTransactions(assetId).do().then(async (data)=>{
            ret=await parseTransactions(data.transactions)
            return res.status(200).json({transactions:ret.reverse()})
        })
    })

}

//upload the profile pic of an item to the server
const uploadProfilePic=(req, res)=>{
    const {itemId}=req.params
    const file=req.file
    const image=req.file.buffer
    fs.writeFile(`./images/item-profile-pics/${file.originalname}`, image, 'base64', function(err){
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
    Item.findOne({_id:itemId}).then(data=>{
        let imagePath
        if(data.profilePic){
            imagePath=path.resolve(`./images/item-profile-pics/${data.profilePic}`)
        }
        else{
            imagePath=path.resolve('./images/item-profile-pics/airmags.jpg')
        }
        return res.sendFile(imagePath)
    }).catch((e)=>{
        console.log("There is an error", e)
        return res.status(404).json({message:"some ERROR has happened"})
    })
}

module.exports={
    getItemInfo,
    getItemTransactions,
    uploadProfilePic,
    getProfilePic,
}