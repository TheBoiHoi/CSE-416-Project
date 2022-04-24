const Company=require('../models/company')
const bcrypt=require('bcrypt')
const Item=require('../models/item')
const QRCode=require('qrcode')
const algosdk = require('algosdk');
const auth=require('../token.js')
const user = require('../models/user');
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
const port = '';
const apitoken = {
    'X-API-Key': 'X4SwVT0RbP46NwfrQxmM61U3pqTUoekDLSigOTpb'
}
const algodclient = new algosdk.Algodv2(apitoken, baseServer, port);
const login=async(req, res)=>{
    const {email, password}=req.body
    const company=await Company.findOne({email:email})
    if(!company){
        return res.status(404).send()
    }

    const hash=company.password
    const valid=await bcrypt.compare(password, hash)
    if(!valid){
        return res.status(404).send('Invalid Password')
    }
    else{
        token=auth.generate(company)
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: "None"
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
    console.log( "My address: " + account.addr );
    console.log( "My passphrase: " + passphrase );
    const company = new Company({name:name, email:email, password:hash, items:[],algoAddr:account.addr,algoPass:passphrase})
    const saved = await company.save()

    res.status(200).json({company:{
        _id:saved._id,
        name:saved.name
    }})
}

const getCompany = async(req, res)=>{
    const company = await Company.findOne({_id:req.params.id})
    if(company){
        return res.status(200).json({
            company:{
                name:company.name,
                items:company.items
            }
        })
    }
    
}

const createItem = async(req,res)=>{
    const{id,name,manu_date,manu_location,manu_owner,serial_number} = req.body

    // Instantiate the algod wrapper
    const company=await Company.findOne({_id:id})
    const companyAcc = algosdk.mnemonicToSecretKey(company.algoPass)
    let accountInfo = await algodclient.accountInformation(companyAcc.addr).do();
    let accountAmount = accountInfo.amount
    let itemOwned = company.items.length
    console.log("Account balance: %d microAlgos", accountAmount);
    let neededAmount = (itemOwned*1000 + 3000)
    console.log("Min amount needed: %d microAlgos", neededAmount);
    if(accountAmount < neededAmount){
        return res.status(404).json({"message":"Not enough Algo"})
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
    let assetName = "CSE416 QRify testing";
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
    opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    confirmedTxn = await algosdk.waitForConfirmation(algodclient, opttx.txId, 4);
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
    company.items.push(newItem.serial_number)
    console.log("new item serial number", newItem.serial_number)
    await newItem.save()
    const saved=await Company.updateOne({_id:id}, {items:company.items})
    if(saved){
        return res.status(404).json({"message":"yes"})
    }
    return res.status(404).json({"message":"err"})
}

const sellItem = async(req,res)=>{
    const {Itemid,companyId,buyerId}=req.body
    const buyer = await user.findOne({_id:buyerId})
    const company = await Company.findOne({_id:companyId})
    const item =  await Item.findOne({_id:Itemid})
    const buyerAcc = algosdk.mnemonicToSecretKey(buyer.algoPass)
    const companyAcc = algosdk.mnemonicToSecretKey(company.algoPass)

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
    const newCompanyItems = companyItems.filter(item => item!=item.serial_number)
    await Company.updateOne({_id:companyId}, {items:newCompanyItems})
    
    //update item owner
    await Item.updateOne({_id:Itemid},{owner:buyer.name})
    
    //push the item to user
    const buyerItems=buyer.items_owned
    buyerItems.push(Itemid)
    await user.updateOne({_id:buyerId}, {items_owned:buyerItems})

    return res.status(200).json({msg:"OK"})
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
    items.push(newItem.serial_number)
    console.log("new item serial number", newItem.serial_number)
    await newItem.save()
    const saved=await Company.updateOne({_id:id}, {items:items})
    if(saved){
        return res.status(200).json({"message":"OK"})
    }
    return res.status(404).json({"message":"ERROR"})
}

const generateItemQRCode = async(req, res)=>{
    const {itemId} = req.body
    const url=`http://localhost/get/item/${itemId}`
    QRCode.toFile(`./qrcodes/items/${itemId}.png`, url, {
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


module.exports={
    register,
    login,
    getCompany,
    addItem,
    generateItemQRCode,
    createItem,
    sellItem
}