import * as React from 'react';
import {Table} from 'react-bootstrap'
import ShoeImg from '../../../../img/airmags.jpg'
import { MDBTable, MDBTableBody, MDBTableHead,MDBDataTable } from 'mdbreact';
import {useEffect, useState} from 'react'
import axios from 'axios'
const ExchangesTab=(props)=>{
  const [trade, setTrade]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3000/trade/complete/get").then(response=>{
      setTrade(response.data.transactions)
      console.log("response transactions:", response.data.transactions)
      data.rows=response.data.transactions
    }).catch((e)=>{console.log("ERROR:", e)})
  },[])
  let data = {
    columns:[
      {
        label: 'ID',
        field: 'id',
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
    console.log("transactions:", data)
    return(
        <div >
            <MDBTable  maxHeight="450px" borderless scrollY hover paging>
                <MDBTableHead  columns={data.columns} />
                <MDBTableBody>
                {trade.map((data)=>{
                  console.log("transaction:", data)
                    return(
                    <tr onClick={()=>{
                        console.log(data.id)
                    }}>
                        <td>{data.id}</td>
                        <td>{data.item}</td>
                        <td>{data.date}</td>
                        <td>{data.other}</td>
                        <td>{data.type}</td>
                    </tr>
                    )
                })}
                </MDBTableBody>
            </MDBTable>
        </div>
    );
};
export default ExchangesTab