import * as React from 'react';
import {Table,Form,Button,Row} from 'react-bootstrap'
import ShoeImg from '../../../../img/airmags.jpg'
import { MDBTable, MDBTableBody, MDBTableHead,MDBDataTable } from 'mdbreact';
import {useEffect, useState} from 'react'
import axios from 'axios'
import ExchangeModal from '../../ExchangeModal';
const ExchangesTab=(props)=>{
  const [trades, setTrades]=useState([])
  const [search,setSearch]=useState("")
  const [selectedExchange,setSelectedExchange]=useState('')
  const [showExchangeModal,setShowExchangeModal]=useState(false)
  useEffect(()=>{
    let url
    if(!props.public){
      url="/user/completed-trade/get"
    }
    else{
      url=`/user/completed-trade/get/${props.user.userId}/${props.keyValue}`
    }
    axios.get(url).then(response=>{
      setTrades(response.data.transactions)
    }).catch((e)=>{console.log("ERROR:", e)})
    
  },[])

  let data = {
    columns:[
      {
        label: '',
        field: '',
        sort: ''
      },
      {
        label: 'Item',
        field: 'item',
        sort: 'asc'
      },
      {
        label: 'Sender',
        field: 'sender',
        sort: 'asc'
      },
      {
        label: 'Receiver',
        field: 'receiver',
        sort: 'asc'
      },
      
      {
        label: 'Date',
        field: 'date',
        sort: 'asc'
      },

    ]
  };
    const openModal=(transaction)=>{
      setSelectedExchange(transaction)
      setShowExchangeModal(true)
    }
    const searchFilter=()=>{
      console.log(search)
    }
    console.log(trades)
    return(
        <div >
        <Row>
        <Form.Control onChange={e=>setSearch(e.target.value.toLowerCase())} style={{width:'50%'}} placeholder="Search"></Form.Control>
        </Row>
            <MDBTable  maxHeight="450px" borderless scrollY hover paging>
                <MDBTableHead  columns={data.columns} />
                <MDBTableBody>
                {trades.filter(trade=>{
                  let sender=trade.senderName.toLowerCase()
                  let receiver=trade.receiverName.toLowerCase()
                  let item=trade.item.toLowerCase()
                  return sender.includes(search)||receiver.includes(search)||item.includes(search)
                }).map((data, i)=>{
                    return(
                    <tr style={{cursor:'pointer'}} key={i} onClick={()=>{
                        openModal(data)
                    }}>
                        <td><img style={{width:'40px',height:'40px',borderRadius:'50%'}}src={`${process.env.REACT_APP_BACKEND_URL}/profile-pic/get/${data.itemId}`}></img></td>
                        <td>{data.item}</td>
                        <td>{data.senderName}</td>
                        <td>{data.receiverName}</td>
                        
                        <td>{data.date}</td>
                    </tr>
                    )
                })}
                </MDBTableBody>
            </MDBTable>
            {showExchangeModal}
            <ExchangeModal  setShow={setShowExchangeModal} show={showExchangeModal} trans={selectedExchange}></ExchangeModal>
        </div>
    );
};
export default ExchangesTab