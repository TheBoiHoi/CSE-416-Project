const Company=require('../models/company')
const bcrypt=require('bcrypt')
const Item=require('../models/item')
const algosdk = require('algosdk');
const auth=require('../token.js')
const user = require('../models/user');
const crypto = require('crypto');
const algorithm = 'aes-192-cbc'; //Using AES encryption

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
        return res.status(200).json({companyId:company._id}).send()
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

    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(passphrase, "utf-8", "hex");
    encrypted += cipher.final("hex");
        
    // console.log( "My address: " + account.addr );
    // console.log( "My passphrase: " + passphrase );
    // console.log( "Encrypted passphrase: " + encrypted)
    
    //Transfer some algo from the wallet account to the users
    (async ()=>{
        const walletId = "6279b484a74732a8bcdc86ad";
        const walletCompany=await Company.findOne({_id:walletId});
        let encryptedText = walletCompany.algoPass;
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        const walletCompanyAcc = algosdk.mnemonicToSecretKey(decryptedData);
        let accountInfo = await algodclient.accountInformation(walletCompanyAcc.addr).do();
        console.log("Wallet Account balance: %d microAlgos", accountInfo.amount);
        let params = await algodclient.getTransactionParams().do();
        let txn = algosdk.makePaymentTxnWithSuggestedParams(walletCompanyAcc.addr, account.addr, 1000000, undefined, undefined, params);
        let rawSignedTxn = txn.signTxn(walletCompanyAcc.sk)
        let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
        const ptx = await algosdk.waitForConfirmation(algodclient, tx.txId, 4);
        console.log("Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]);
        let newAccountInfo = await algodclient.accountInformation(account.addr).do();
        console.log("New Account balance: %d microAlgos", newAccountInfo.amount);


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

const getCompany = async(req, res)=>{
    const companyId=req.companyId
    if(!companyId){
        return res.status(404).json({msg:"No company id"})
    }
    Company.findOne({_id:companyId}).then(data=>{
        if(!data){
            return res.status(404).json({msg:"company not found"})
        }
        return res.status(200).json({
            company:{
                companyId:data._id,
                name:data.name,
                items:data.items
            }
        })
    })
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
        //Algo stuff
        let params = await algodclient.getTransactionParams().do();
        //comment out the next two lines to use suggested fee
        params.fee = 1000;
        params.flatFee = true;
        console.log(params);
        let note = undefined; 
        let addr = companyAcc.addr;
        let defaultFrozen = false;
        let decimals = 0;
        let totalIssuance = 1;
        let unitName = "Qrify";
        let assetName = name;
        let assetURL = "http://CSE416";
        let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac611";
        let manager = companyAcc.addr;
        let reserve = companyAcc.addr;
        let freeze = companyAcc.addr;
        let clawback = companyAcc.addr;
        // signing and sending "txn" allows "addr" to create an asset
    let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        addr, 
        note,
        totalIssuance, 
        decimals, 
        defaultFrozen, 
        manager, 
        reserve, 
        freeze,
        clawback, 
        unitName, 
        assetName, 
        assetURL, 
        assetMetadataHash, 
        params);
        
    let rawSignedTxn = txn.signTxn(companyAcc.sk)
    let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    let assetID = null;
    const ptx = await algosdk.waitForConfirmation(algodclient, tx.txId, 4);
    assetID = ptx["asset-index"];
    console.log("Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]);
    
    //opt in
    sender = companyAcc.addr;
    recipient = sender;
    amount = 0;
    closeRemainderTo = undefined
    revocationTarget = undefined
    opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, 
        recipient, 
        closeRemainderTo, 
        revocationTarget,
        amount, 
        note, 
        assetID, 
        params);
        
    rawSignedTxn = opttxn.signTxn(companyAcc.sk);
    opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do())
    confirmedTxn = await algosdk.waitForConfirmation(algodclient, opttx.txId, 4)
    console.log("Transaction " + opttx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    console.log("Company = " + companyAcc.addr);

    //get the asset
    amount = 1;
    opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, 
        recipient, 
        closeRemainderTo, 
        revocationTarget,
        amount, 
        note, 
        assetID, 
        params);
    rawSignedTxn = opttxn.signTxn(companyAcc.sk);
    opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    confirmedTxn = await algosdk.waitForConfirmation(algodclient, opttx.txId, 4);

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
    await newItem.save()
    const saved=await Company.updateOne({_id:id}, {items:company.items})
    if(saved){
        return res.status(200).json({"message":"yes"})
    }
    return res.status(404).json({"message":"err"})

    })().catch(e => {
        console.log(e);
        return res.status(404).json({"message":"err"})
    });
    

    
}

const sellItem = async(req,res)=>{
    const {Itemid,companyId,buyerId}=req.body;
    (async () =>{
        const buyer = await user.findOne({_id:buyerId})
        const company = await Company.findOne({_id:companyId})
        const item =  await Item.findOne({_id:Itemid})
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
        //buyer opt in for this assets
    params = await algodclient.getTransactionParams().do();
    params.fee = 1000;
    params.flatFee = true;
    let note = undefined;
    let sender = buyerAcc.addr;
    let recipient = sender;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    assetID = item.asset_id
    amount = 0;
    let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, 
        recipient, 
        closeRemainderTo, 
        revocationTarget,
        amount, 
        note, 
        assetID, 
        params);
    rawSignedTxn = opttxn.signTxn(buyerAcc.sk);
    let opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    confirmedTxn = await algosdk.waitForConfirmation(algodclient, opttx.txId, 4);

    //Transfer the asset from company to user
    params = await algodclient.getTransactionParams().do();
    sender = companyAcc.addr;
    recipient = buyerAcc.addr;
    revocationTarget = undefined;
    closeRemainderTo = undefined;
    amount = 1;
    let xtxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, 
        recipient, 
        closeRemainderTo, 
        revocationTarget,
        amount,  
        note, 
        assetID, 
        params);
    rawSignedTxn = xtxn.signTxn(companyAcc.sk)
    let xtx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    confirmedTxn = await algosdk.waitForConfirmation(algodclient, xtx.txId, 4);

    //remove the item from company
    const companyItems= company.items
    const newCompanyItems = companyItems.filter(item => item!=Itemid)
    await Company.updateOne({_id:companyId}, {items:newCompanyItems})
    
    //update item owner
    await Item.updateOne({_id:Itemid},{owner:buyer.name})
    
    //push the item to user
    const buyerItems=buyer.items_owned
    buyerItems.push(Itemid)
    await user.updateOne({_id:buyerId}, {items_owned:buyerItems})
    console.log("done")
    return res.status(200).json({msg:"OK"})
    })().catch(e => {
        console.log(e);
        return res.status(404).json({"message":"err"})
    });
    
    
}

const addItem = async(req, res)=>{
    const {id, item}=req.body
    const company=await Company.findOne({_id:id})
    const items=company.items
    console.log("serial number:", item.serial_number)
    const newItem=new Item({
        name:item.name,
        owner:item.owner,
        transactions:[],
        asset_id:item.asset_id,
        serial_number:item.serial_number,
        manu_date:item.manu_date,
        manu_location:item.manu_location,
        manu_owner:item.manu_owner
    })
    items.push(newItem._id)
    console.log("new item id", newItem._id)
    await newItem.save()
    const saved=await Company.updateOne({_id:id}, {items:items})
    if(saved){
        return res.status(200).json({"message":"OK"})
    }
    return res.status(404).json({"message":"ERROR"})
}

const getItem = async(req,res)=>{
    const {id} = req.params
    console.log("looking for item "+ id)
    Item.findOne({_id:id}).then(data=>{
        if(!data){
            return res.status(404).json({msg:"Item can not be found"})
        }
        return res.status(200).json({
            item:{
                name:data.name,
                owner:data.owner,
                transactions:data.transactions,
                asset_id:data.asset_id,
                serial_number:data.serial_number,
                manu_date:data.manu_date,
                manu_location:data.manu_location,
                manu_owner:data.manu_owner
            }
        })
    })
}


module.exports={
    register,
    login,
    getCompany,
    addItem,
    createItem,
    sellItem,
    getItem
}