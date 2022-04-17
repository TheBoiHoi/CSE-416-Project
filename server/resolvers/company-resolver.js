const Company=require('../models/company')
const bcrypt=require('bcrypt')
const Item=require('../models/item')
const QRCode=require('qrcode')
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
    const{id,name,manu_date,manu_location,manu_owner} = req.body
    const algosdk = require('algosdk');
    const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const server = "http://localhost";
    const port = 4001;
    // Instantiate the algod wrapper
    let algodclient = new algosdk.Algodv2(token, server, port);
    const company=await Company.findOne({_id:id})
    const companyAcc = algosdk.mnemonicToSecretKey(company.algoPass)
    //Algo stuff
    let params = await algodclient.getTransactionParams().do();
    //comment out the next two lines to use suggested fee
    params.fee = 1000;
    params.flatFee = true;
    console.log(params);
    let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
    // Asset creation specific parameters
    // The following parameters are asset specific
    // Throughout the example these will be re-used. 
    // We will also change the manager later in the example
    let addr = companyAcc.addr;
    // Whether user accounts will need to be unfrozen before transacting    
    let defaultFrozen = false;
    // integer number of decimals for asset unit calculation
    let decimals = 0;
    // total number of this asset available for circulation   
    let totalIssuance = 1000;
    // Used to display asset units to user    
    let unitName = "Qrify";
    // Friendly name of the asset    
    let assetName = "CSE416 QRify testing";
    // Optional string pointing to a URL relating to the asset
    let assetURL = "http://CSE416";
    // Optional hash commitment of some sort relating to the asset. 32 character length.
    let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac611";
    // The following parameters are the only ones
    // that can be changed, and they have to be changed
    // by the current manager
    // Specified address can change reserve, freeze, clawback, and manager
    let manager = companyAcc.addr;
    // Specified address is considered the asset reserve
    // (it has no special privileges, this is only informational)
    let reserve = companyAcc.addr;
    // Specified address can freeze or unfreeze user asset holdings 
    let freeze = companyAcc.addr;
    // Specified address can revoke user asset holdings and send 
    // them to other addresses    
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
    // wait for transaction to be confirmed
    const ptx = await algosdk.waitForConfirmation(algodclient, tx.txId, 4);
    // Get the new asset's information from the creator account
    // let ptx = await algodclient.pendingTransactionInformation(tx.txId).do();
    assetID = ptx["asset-index"];
    //Get the completed Transaction
    console.log("Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]);
    const newItem=new Item({
        name:name,
        owner:company.name,
        transactions:[],
        asset_id:assetID,
        serial_number:123,
        manu_date:manu_date,
        manu_location:manu_location,
        manu_owner:manu_owner
    })
    const save = await newItem.save()
    if(save){
        return res.status(404).json({"message":"yes"})
    }
    return res.status(404).json({"message":"err"})
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
    const url=`http://localhost/qrcode/item/${itemId}`
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
}