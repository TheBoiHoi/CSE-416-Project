import React, {useState, useEffect} from 'react';
import {Tab,Tabs, Spinner, Form, Button,Row} from 'react-bootstrap';
import ExchangesTab from './TabContent/ExchangesTab/ExchangesTab';
import InventoryTab  from './TabContent/InventoryTab/InventoryTab';
import PendingTab from './TabContent/PendingTab/PendingTab';
import PendingModal from './TabContent/PendingTab/PendingModal';
import axios from 'axios'
import './TabContent/PendingTab/pendingTab.css';

const PrivateTabs=(props)=>{
    //PENDING MODAL
    const [show, setShow] = useState(false);
    const [trade, setTrade] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState (false);
    const [buttonShow, setButtonShow] = useState(true);
    const [completeDisabled, setCompleteDisabled] = useState(false);

    const showModal = (trade) => {
        setShow(true);
        setTrade(trade);
        if((trade.seller_id == props.user.userId && trade.seller_status == true)
                || (trade.buyer_id == props.user.userId && trade.buyer_status == true)){
            setCompleteDisabled(true);
        }else{
            setCompleteDisabled(false);
        }
    }
    
    const hideModal = () => {
        setShow(false);
        setDisabled(false);
        setLoading(false);
        setButtonShow(true);
    }

    const confirmTrade = async () => {
        setDisabled(true);
        setLoading(true);
        setButtonShow(false);
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/trade/update-status`, {
            tradeId: trade._id,
            userId: props.user.userId
        });
        if(data){
            const trade = data.data;
            if(trade.buyer_status == true && trade.seller_status == true){
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/trade/complete`, {
                    tradeId: trade._id
                });
                if(res.data.message == 'Error'){
                    window.alert("Transaction not completed! Error encountered!");
                }
            }
        }
        await fetchPendingTrades();
        hideModal();
    }

    const cancelTrade = async () => {
        setLoading(true);
        setButtonShow(false);
        setDisabled(true);
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/trade/cancel`, {
            tradeId: trade._id
        });
        console.log("done cancelling");
        console.log(data);
        await fetchPendingTrades();
        hideModal();
    }
    

    //PENDING TABS
    const [trades, setTrades] = useState({
        trades: [],
        items: [],
        buyers: [],
        sellers: []
    })

    useEffect(() => {
        fetchPendingTrades();
    }, []);

    const fetchPendingTrades =  async () => {
        const data = await axios.get(`/user/pending-trade/get/${props.user.userId}`);
        if(data.data){ 
            const itemsList = await fetchPendingItems(data.data);
            const {buyersList, sellersList} = await fetchBuyersAndSellers(data.data);
            const trades = {
                trades: data.data,
                items: itemsList,
                buyers: buyersList,
                sellers: sellersList
            }
            setTrades(trades)    
        }
    }

    const fetchPendingItems = async (tradesList) => {
        const itemsList = []
        for(const trade of tradesList){
            const itemId = trade.item_id;
            const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/item/get/${itemId}`)
            itemsList.push(data.data.item);
        }
        return itemsList;
    }

    const fetchBuyersAndSellers = async (tradeslist) => {
        const buyersList = []
        const sellersList = []
        for(const trade of tradeslist){
            const buyerId = trade.buyer_id;
            const sellerId = trade.seller_id;
            const buyerData = await axios.get(`/user/public/get/${buyerId}`)
            const sellerData = await axios.get(`/user/public/get/${sellerId}`)
            buyersList.push(buyerData.data.user);
            sellersList.push(sellerData.data.user);
        }
        return {buyersList, sellersList};
    }

    //SEARCHING FILTER
    const [search, setSearch] = useState("");

    const searchFilter = async (e) => {
        e.preventDefault();
        if (search == "") {
            await fetchPendingTrades();
            return;
        }
        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/search`, {
            query: search,
            userId: props.user.userId
        });
        if (data.data) {
            const itemsList = await fetchPendingItems(data.data);
            const { buyersList, sellersList } = await fetchBuyersAndSellers(data.data);
            const trades = {
                trades: data.data,
                items: itemsList,
                buyers: buyersList,
                sellers: sellersList
            }
            setTrades(trades)
        }
    }


    return(
        <>
            <Tabs style={{width:"50%"}} defaultActiveKey="Exchanges" id="uncontrolled-tab-example" className="mb-3">
                <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Exchanges" title="Exchanges">
                    <ExchangesTab  user={props.user}></ExchangesTab>
                </Tab>
                <Tab style={{width:"50%",boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Inventory" title="Inventory">
                    <InventoryTab user={props.user}></InventoryTab>
                </Tab>
                <Tab style={{ width: "50%", boxShadow: "1px 1px 1px #9E9E9E"}} eventKey="Pending" title="Pending" >
                   
                    <Form>
                        <Form.Group>
                            <Row>
                                <Form.Control onChange={e=>setSearch(e.target.value.toLowerCase())} style={{width:'50%'}} placeholder="Search" />
                                <Button style={{width:'100px'}} onClick={searchFilter} variant="primary" type="submit"> Search </Button>
                            </Row>
                        </Form.Group>
                    </Form>
                    <PendingTab  pendings={trades} handleShowModal={showModal}></PendingTab>
                    <PendingModal completeDisabled={completeDisabled} buttonShow={buttonShow} handleCancel={cancelTrade} handleConfirm={confirmTrade} show={show} hide={hideModal} disabled={disabled}/>
                </Tab>
            </Tabs>
            {loading && <Spinner className="loading" animation="grow" />}
        </>
    )
};
export default PrivateTabs