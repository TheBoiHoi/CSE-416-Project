const Company=require('../models/company')
const bcrypt=require('bcrypt')
const QRCode=require('qrcode')
const Item=require('../models/item')
const algosdk = require('algosdk');
const auth=require('../common/token.js')
const User = require('../models/user');
const crypto = require('crypto');
const algorithm = 'aes-192-cbc'; //Using AES encryption
const {createItems,fundAccount,itemOptIn, tradeItem} =require('../common/algoUtils')

//Didn't use random because it generate a different key and iv if the sever crash
const key = crypto.scryptSync("generate key","salt",24)
const iv = Buffer.alloc(16,0)

require('dotenv').config()
//const { default: AlgodClient } = require('algosdk/dist/types/src/client/v2/algod/algod');
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
const port = '';

const {TOKEN}=process.env
const apitoken = {
    'X-API-key':TOKEN
}
const algodclient = new algosdk.Algodv2(apitoken, baseServer, port);

const login=async(req, res)=>{
    console.log("company logging in")
    const {email, password}=req.body
    const company=await Company.findOne({email:email})
    console.log("starting.....");
    if(!company){
        console.log("not company");
        return res.status(404).send("Cannot find the company")
    }

    const hash=company.password
    const valid=await bcrypt.compare(password, hash)
    if(!valid){
        console.log("password is not valid");
        return res.status(404).send('Invalid Password')
    }
    else{
        token=auth.generate(company, true)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        return res.status(200).json({
            company:{
                companyId:company._id,
                name:company.name,
                items:company.items,
                isCompany:true
            }
            
        })
    }
}

const register = async(req, res)=>{
    const{name, email, password} = req.body
    const hash = await bcrypt.hash(password, 10)
    const algosdk = require('algosdk');
    let account = algosdk.generateAccount();
    let passphrase = algosdk.secretKeyToMnemonic(account.sk);

    // console.log( "key: "+key)
    // console.log( "iv: "+iv)
    // console.log( "My address: " + account.addr );
    // console.log( "My passphrase: " + passphrase );
    // console.log( "Encrypted passphrase: " + encrypted)
    
    //Transfer some algo from the wallet account to the users
    (async ()=>{
        let cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(passphrase, "utf-8", "hex");
        encrypted += cipher.final("hex");
        

        await fundAccount(account.addr)


        const company = new Company({name:name, email:email, password:hash, items:[],algoAddr:account.addr,algoPass:encrypted})
        const saved = await company.save()
        console.log("done registering")
        return res.status(200).json({company:{
            _id:saved._id,
            name:saved.name
        }})
    })().catch(e => {
        console.log(e);
        return res.status(404).json({"message":"err"})
    });
    
}

const createItem = async(req,res)=>{
    const{id,name,manu_date,manu_location,manu_owner,serial_number} = req.body;

    (async ()=>{
        console.log("Looking for company with id: " + id);
        const company=await Company.findOne({_id:id});
        //Decrypting AlgoPass
        // console.log(company.algoPass)
        // let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = company.algoPass;
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        // console.log("decrypted : " + decryptedData )
        // Instantiate the algod wrapper
        
        const companyAcc = algosdk.mnemonicToSecretKey(decryptedData);
        let accountInfo = await algodclient.accountInformation(companyAcc.addr).do();
        let accountAmount = accountInfo.amount;
        let itemOwned = company.items.length;
        console.log("Account balance: %d microAlgos", accountAmount);
        let neededAmount = (itemOwned*1000 + 3000);
        console.log("Min amount needed: %d microAlgos", neededAmount);
        if(accountAmount < neededAmount){
            return res.status(404).json({"message":"err"})
        }

    let assetID = await createItems(companyAcc,name);

    const newItem=new Item({
        name:name,
        owner:company.name,
        transactions:[],
        asset_id:assetID,
        serial_number:serial_number,
        manu_date:manu_date,
        manu_location:manu_location,
        manu_owner:manu_owner
    })
    company.items.push(newItem._id)
    console.log("new item id number", newItem._id)
    let saved=await newItem.save()
    generateItemQRCode(newItem._id)
    let updated=await Company.updateOne({_id:id}, {items:company.items})
    if(saved){
        return res.status(200).json({"message":"yes","itemId":newItem._id});
    }
    return res.status(404).json({"message":"err"})

    })().catch(e => {
        console.log(e);
        return res.status(404).json({"message":"err"})
    });
}

const generateItemQRCode = (itemId)=>{
    const url=`http://194.113.72.18/item/profile/${itemId}`
    QRCode.toFile(`./images/item-qrcodes/${itemId}.png`, url, {
        color: {
          dark: '#000000',  // Blue dots
          light: '#FFFFFF' // Transparent background
        }
      }, function (err) {
        if (err) throw err
        console.log('done')
    })
}

const sellItem = async(req,res)=>{
    const {itemId,companyId,buyerId}=req.body;
    
    (async () =>{
        const buyer = await User.findOne({_id:buyerId})
        const company = await Company.findOne({_id:companyId})
        const item =  await Item.findOne({_id:itemId})
        console.log(company.algoPass)
        //Decrypted Buyer algo password
        let BuyerencryptedText = buyer.algoPass
        var decipher = crypto.createDecipheriv(algorithm, key, iv);
        let BuyerdecryptedData = decipher.update(BuyerencryptedText, "hex", "utf-8");
        BuyerdecryptedData += decipher.final("utf8");
    
        const buyerAcc = algosdk.mnemonicToSecretKey(BuyerdecryptedData)
        
        //Decrtpted Company algo Password
        let companyEncryptedText = company.algoPass
        decipher = crypto.createDecipheriv(algorithm, key, iv);
        let companyDecryptedData = decipher.update(companyEncryptedText, "hex", "utf-8");
        companyDecryptedData += decipher.final("utf8");
        
        const companyAcc = algosdk.mnemonicToSecretKey(companyDecryptedData)
    
        let accountInfo = await algodclient.accountInformation(companyAcc.addr).do();
        let accountAmount = accountInfo.amount
        let itemOwned = company.items.length
        console.log("Company balance: %d microAlgos", accountAmount);
        let neededAmount = ((itemOwned-1)*1000 + 1000)
        console.log("Min amount needed: %d microAlgos", neededAmount);
        if(accountAmount < neededAmount){
            return res.status(404).json({"message":"Not enough Algo for company"})
        }
    
        let buyerInfo = await algodclient.accountInformation(buyerAcc.addr).do();
        accountAmount = buyerInfo.amount
        itemOwned = buyer.items_owned.length
        console.log("Buyer balance: %d microAlgos", accountAmount);
        neededAmount = ((itemOwned+1)*1000 + 2000)
        console.log("Min amount needed: %d microAlgos", neededAmount);
        if(accountAmount < neededAmount){
            return res.status(404).json({"message":"Not enough Algo from buyer"})
        }

    assetID = item.asset_id
    
    //The buyer account opt in
    await itemOptIn(buyerAcc,assetID);
    
    //Company account transfer the item over
    await tradeItem(companyAcc,buyerAcc,assetID);

    //remove the item from company

    const companyItems= company.items
    const newCompanyItems = companyItems.filter(item => item!=itemId)
    await Company.updateOne({_id:companyId}, {items:newCompanyItems})
    
    //update item owner
    await Item.updateOne({_id:itemId},{owner:buyer.name})
    
    //push the item to user
    const buyerItems=buyer.items_owned
    buyerItems.push(itemId)
    await User.updateOne({_id:buyerId}, {items_owned:buyerItems})
    console.log("done")

    return res.status(200).json({msg:"OK"})
    })().catch(e => {
        console.log(e);
        return res.status(404).json({"message":"err"})
    });
}

module.exports={
    register,
    login,
    createItem,
    sellItem,
}