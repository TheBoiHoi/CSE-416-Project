import * as React from 'react';
import {Table,Form,Button,Row} from 'react-bootstrap'
import ShoeImg from '../../../../img/airmags.jpg'
import { MDBTable, MDBTableBody, MDBTableHead,MDBDataTable } from 'mdbreact';
import {useEffect, useState} from 'react'
import axios from 'axios'
import ExchangeModal from '../../ExchangeModal';
const ExchangesTab=(props)=>{
  const [trade, setTrade]=useState([])
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
      setTrade(response.data.transactions)
    }).catch((e)=>{console.log("ERROR:", e)})
    
  },[])

  let data = {
    columns:[
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
        label: 'Item',
        field: 'item',
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
    return(
        <div >
        <Row>
        <Form.Control onChange={e=>setSearch(e.target.value)} style={{width:'50%'}} placeholder="Search"></Form.Control>
        <Button onClick={searchFilter} style={{width:'10%'}} variant="primary" type="submit">
          Search
        </Button>
        </Row>
            <MDBTable  maxHeight="450px" borderless scrollY hover paging>
                <MDBTableHead  columns={data.columns} />
                <MDBTableBody>
                {trade.map((data, i)=>{
                    return(
                    <tr key={i} onClick={()=>{
                        openModal(data)
                    }}>
                        <td>{data.senderName}</td>
                        <td>{data.receiverName}</td>
                        <td>{data.item}</td>
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