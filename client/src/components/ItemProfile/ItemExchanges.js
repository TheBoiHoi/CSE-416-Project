import * as React from 'react';
import {Table,Row,Col} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead,MDBDataTable } from 'mdbreact';
import axios from 'axios';
const ItemExchanges=(props)=>{
  const {itemId} = useParams()
  const [transactions, setTransactions]=React.useState([])
  React.useEffect(()=>{
    axios.get(`http://localhost:3000/item-transactions/get/${itemId}`).then((response)=>{
        console.log("item transactions:", response.data.transactions)
        setTransactions(response.data.transactions)
    })
  }, [])
  const data = {
    columns: [
      {
        label: 'Date',
        field: 'date',
        sort: 'asc'
      },
      {
        label: 'From',
        field: 'user_from',
        sort: 'asc'
      },
      {
        label: 'To',
        field: 'user_to',
        sort: 'asc'
      },
      {
        label: 'Transaction ID',
        field: 'transaction_id',
        sort: 'asc'
      },
    ],
    // rows: [
    //   {
    //     'date':'05/19/2022',
    //     'user_from':'u412',
    //     'user_to':'u579',
    //     'transaction_id':'1dlafjganwamad'
    //   },
    //   {
    //     'date':'05/19/2022',
    //     'user_from':'u412',
    //     'user_to':'u579',
    //     'transaction_id':'1dlafjganwamad'
    //   },
    //   {
    //     'date':'05/19/2022',
    //     'user_from':'u412',
    //     'user_to':'u579',
    //     'transaction_id':'1dlafjganwamad'
    //   },
    // ]
  };
      
    return(
        <div >
            <MDBTable  style={{width:'70%'}} maxHeight="450px"  scrollY hover paging>
                <MDBTableHead  columns={data.columns} />
                
                <MDBTableBody>
                {transactions.map((transaction)=>{
                    return(
                    <tr>
                        <td>{transaction.date}</td>
                        <td>{transaction.sender}</td>
                        <td>{transaction.receiver}</td>
                        <td>{transaction.transactionId}</td>
                    </tr>
                    )
                })}
                </MDBTableBody>
                
            </MDBTable>
        </div>
    );
};
export default ItemExchanges