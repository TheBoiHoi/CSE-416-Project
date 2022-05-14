//put the algorand related stuff here
const Company=require('../models/company')
const User=require('../models/user')
const Item=require('../models/item')

const crypto = require('crypto');
const algorithm = 'aes-192-cbc'; //Using AES encryption
//Didn't use random because it generate a different key and iv if the sever crash
const key = crypto.scryptSync("generate key","salt",24)
const iv = Buffer.alloc(16,0)

require('dotenv').config()
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
const port = '';
const algosdk = require('algosdk');
const {TOKEN}=process.env
const apitoken = {
    'X-API-key':TOKEN
}
const algodclient = new algosdk.Algodv2(apitoken, baseServer, port);
/*
Just a module that parsed the transaction get from the algorand indexer
*/
async function parseTransactions(transactions){
    ret=[]
    for(let i=0;i<transactions.length;i++){
        let transaction=transactions[i]
        if(transaction['asset-transfer-transaction']){
            receiverAlgoId=transaction['asset-transfer-transaction']['receiver']
            senderAlgoId=transaction['sender']
            itemAssetId=transaction['asset-transfer-transaction']['asset-id']
            
            if(receiverAlgoId!=senderAlgoId){//this means that the transaction is not an opt in
                let receiver=await User.findOne({algoAddr:receiverAlgoId})
                if(!receiver){
                    receiver=await Company.findOne({algoAddr:receiverAlgoId})
                }
                let sender=await User.findOne({algoAddr:senderAlgoId})
                if(!sender){
                    sender=await Company.findOne({algoAddr:senderAlgoId})
                }
                let item=await Item.findOne({asset_id:itemAssetId})
                ret.push({
                    txid:transaction['id'],
                    receiverName:receiver.name,
                    senderName:sender.name,
                    receiverId:receiver._id,
                    senderId:sender._id,
                    item:item.name,
                    itemId:item._id,
                    date:new Date(transaction['round-time']*1000).toLocaleString('en-US')
                })
            }
        }
    }
    return ret
};

async function fundAccount(userAddr){
    //Get the wallet account in our data base
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
    let txn = algosdk.makePaymentTxnWithSuggestedParams(walletCompanyAcc.addr, userAddr, 3000000, undefined, undefined, params);
    let rawSignedTxn = txn.signTxn(walletCompanyAcc.sk)
    let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    const ptx = await algosdk.waitForConfirmation(algodclient, tx.txId, 4);
    console.log("Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]);
    let newAccountInfo = await algodclient.accountInformation(userAddr).do();
    console.log("New Account balance: %d microAlgos", newAccountInfo.amount);
    console.log("Finish funding account");
}

async function itemOptIn(user,assetID){
    console.log("Item opt in process")
    let params = await algodclient.getTransactionParams().do();
    let note = undefined; 
    let sender = user.addr;
    let recipient = sender;
    let amount = 0;
    let closeRemainderTo = undefined
    let revocationTarget = undefined
    opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, 
        recipient, 
        closeRemainderTo, 
        revocationTarget,
        amount, 
        note, 
        assetID, 
        params);
        
    rawSignedTxn = opttxn.signTxn(user.sk);
    opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do())
    confirmedTxn = await algosdk.waitForConfirmation(algodclient, opttx.txId, 4)
    console.log("Transaction " + opttx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    console.log("Finish Item Opt in");
}

async function tradeItem(user1,user2,assetID){
    console.log("Begin Transfering item")
    let params = await algodclient.getTransactionParams().do();
    let note = undefined; 
    let sender = user1.addr;
    let recipient = user2.addr;
    let amount = 1;
    let closeRemainderTo = undefined
    let revocationTarget = undefined
    opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        sender, 
        recipient, 
        closeRemainderTo, 
        revocationTarget,
        amount, 
        note, 
        assetID, 
        params);
        
    rawSignedTxn = opttxn.signTxn(user1.sk);
    opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do())
    confirmedTxn = await algosdk.waitForConfirmation(algodclient, opttx.txId, 4)
    console.log("Transaction " + opttx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    console.log("Finish Trading process")

}

async function createItems(user,name){
    //Generate the asset
    console.log("Start creating Item")
    let params = await algodclient.getTransactionParams().do();
        //comment out the next two lines to use suggested fee
        params.fee = 1000;
        params.flatFee = true;
        console.log(params);
        let note = undefined; 
        let addr = user.addr;
        let defaultFrozen = false;
        let decimals = 0;
        let totalIssuance = 1;
        let unitName = "Qrify";
        let assetName = name;
        let assetURL = "http://CSE416";
        let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac611";
        let manager = user.addr;
        let reserve = user.addr;
        let freeze = user.addr;
        let clawback = user.addr;
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
        
    let rawSignedTxn = txn.signTxn(user.sk)
    let tx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
    let assetID = null;
    const ptx = await algosdk.waitForConfirmation(algodclient, tx.txId, 4);
    assetID = ptx["asset-index"];
    console.log("Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]);
    console.log("Finish creating item");
    return assetID
}

module.exports={
    parseTransactions,
    fundAccount,
    itemOptIn,
    tradeItem,
    createItems
}
