import React, {useState, useEffect} from 'react';
import {Tab,Tabs} from 'react-bootstrap';
import ExchangesTab from './TabContent/ExchangesTab/ExchangesTab';
import InventoryTab  from './TabContent/InventoryTab/InventoryTab';
import PendingTab from './TabContent/PendingTab/PendingTab';
import PendingModal from './TabContent/PendingTab/PendingModal';
import axios from 'axios'

const PrivateTabs=(props)=>{
    //PENDING MODAL
    const [show, setShow] = useState(false);
    const [trade, setTrade] = useState({});
    const [item, setItem] = useState({});
    const [buyer, setBuyer] = useState({});
    const [seller, setSeller] = useState({});
    const [disabled, setDisabled] = useState(false);

    const showModal = (trade, item, buyer, seller) => {
        setShow(true);
        setTrade(trade);
        setItem(item);
        setBuyer(buyer);
        setSeller(seller);
        if((trade.seller_id == props.user.userId && trade.seller_status == true)
                || (trade.buyer_id == props.user.userId && trade.buyer_status == true)){
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    }
    
    const hideModal = () => {
        setShow(false);
    }

    const confirmTrade = async () => {
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/trade/update-status`, {
            tradeId: trade._id,
            userId: props.user.userId
        });
        if(data){
            const trade = data.data;
            if(trade.buyer_status == true && trade.seller_status == true){
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/trade/complete`, {
                    tradeId: trade._id
                });
            }
        }
        setDisabled(true);
        await fetchPendingTrades();
        hideModal();
    }
    

    //PENDING TABS
    const [trades, setTrades] = useState([])
    const [items, setItems] = useState([])
    const [buyers, setBuyers] = useState([])
    const [sellers, setSellers] = useState([])

    useEffect(() => {
        fetchPendingTrades();
    }, []);

    const fetchPendingTrades =  async () => {
        console.log("fetching trades")
        const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pending-trade/get/${props.user.userId}`);
        if(data.data){ 
            await fetchPendingItems(data.data);
            await fetchBuyersAndSellers(data.data);
            setTrades(data.data)      
        }
    }

    const fetchPendingItems = async (tradesList) => {
        const itemsList = []
        for(const trade of tradesList){
            const itemId = trade.item_id;
            const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/get/${itemId}`)
            itemsList.push(data.data.item);
        }
        setItems(itemsList)
    }

    const fetchBuyersAndSellers = async (tradeslist) => {
        const buyersList = []
        const sellersList = []
        for(const trade of tradeslist){
            const buyerId = trade.buyer_id;
            const sellerId = trade.seller_id;
            const buyerData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/public/get/${buyerId}`)
            const sellerData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/public/get/${sellerId}`)
            buyersList.push(buyerData.data.user);
            sellersList.push(sellerData.data.user);
        }
        setBuyers(buyersList)
        setSellers(sellersList)
    }


    return(
    <Tabs style={{width:"50%"}} defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Exchanges" title="Exchanges">
            <ExchangesTab  user={props.user}></ExchangesTab>
        </Tab>
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Inventory" title="Inventory">
            <InventoryTab user={props.user}></InventoryTab>
        </Tab>
        <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Pending" title="Pending" >
            <PendingTab trades={trades} buyers={buyers} sellers={sellers} items={items} handleShowModal={showModal}></PendingTab>
            <PendingModal handleConfirm={confirmTrade} show={show} trade={trade} buyer={buyer} seller={seller} item={item} hide={hideModal} disabled={disabled}/>
        </Tab>
    </Tabs>
    )
};
export default PrivateTabs