import * as React from 'react';
import {Table} from 'react-bootstrap'
import ShoeImg from '../../../../img/airmags.jpg'
import { MDBTable, MDBTableBody, MDBTableHead,MDBDataTable } from 'mdbreact';
import {useEffect, useState} from 'react'
import axios from 'axios'
import ExchangeModal from '../../ExchangeModal';
const ExchangesTab=(props)=>{
  const [trade, setTrade]=useState([])
  const [selectedExchange,setSelectedExchange]=useState('')
  const [showExchangeModal,setShowExchangeModal]=useState(false)
  useEffect(()=>{
    let url
    if(!props.public){
      url="http://localhost:3000/completed-trade/get"
    }
    else{
      url=`http://localhost:3000/completed-trade/get/${props.user.userId}/${props.keyValue}`
    }
    axios.get(url).then(response=>{
      setTrade(response.data.transactions)
      //console.log("response transactions:", response.data.transactions)
      // response.data.transactions.forEach(transaction=>{
      //   let dict={
      //     sender:transaction.senderName,
      //     receiver: transaction.receiverName,
      //     item:transaction.item,
      //     date:transaction.timestamp
      //   }
      //   data.rows.push(dict)
      //   console.log("data rows:", data.rows)
      // })
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

    ],

      // columns: [
      //   ,
      
      //   {
      //     label: 'Date',
      //     field: 'date',
      //     sort: 'asc'
      //   },
      //   {
      //     label: 'From/To',
      //     field: 'other',
      //     sort: 'asc'
      //   },
      //   {
      //     label: 'Exchange Type',
      //     field: 'type',
      //     sort: 'asc'
      //   },
      // ],
      rows:[]
      // rows: [
      //   {
      //     'id': '1',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      //   {
      //     'id': '2',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      //   {
      //     'id': '5yd75E4WW7zEZndm',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      //   {
      //     'id': '5yd75E4WW7zEZndm',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      //   {
      //     'id': '5yd75E4WW7zEZndm',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      //   {
      //     'id': '5yd75E4WW7zEZndm',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      //   {
      //     'id': '5yd75E4WW7zEZndm',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      //   {
      //     'id': '5yd75E4WW7zEZndm',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      //   {
      //     'id': '5yd75E4WW7zEZndm',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      //   {
      //     'id': '5yd75E4WW7zEZndm',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      //   {
      //     'id': '5yd75E4WW7zEZndm',
      //     'item': 'Yeezy Slides',
      //     'date':'05/19/2022',
      //     'other':'1xdasdwatadfagag',
      //     'type':'BUY'
      //   },
      // ]
  };
    const openModal=(id)=>{
      setSelectedExchange(id)
      setShowExchangeModal(true)
    }
    return(
        <div >
            <MDBTable  maxHeight="450px" borderless scrollY hover paging>
                <MDBTableHead  columns={data.columns} />
                <MDBTableBody>
                {trade.map((data, i)=>{
                    return(
                    <tr key={i} onClick={()=>{
                        openModal(data.id)
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
            <ExchangeModal setShow={setShowExchangeModal} show={showExchangeModal} transid={selectedExchange}></ExchangeModal>
        </div>
    );
};
export default ExchangesTab