//put the algorand related stuff here
const Company=require('../models/company')
const User=require('../models/user')
const Item=require('../models/item')
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
    return ret
}

module.exports={
    parseTransactions
}
