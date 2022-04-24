import * as React from 'react';
import {Table,Row,Col} from 'react-bootstrap'
import { MDBTable, MDBTableBody, MDBTableHead,MDBDataTable } from 'mdbreact';
const ItemExchanges=(props)=>{
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
        rows: [
          {
            'date':'05/19/2022',
            'user_from':'u412',
            'user_to':'u579',
            'transaction_id':'1dlafjganwamad'
          },
          {
            'date':'05/19/2022',
            'user_from':'u412',
            'user_to':'u579',
            'transaction_id':'1dlafjganwamad'
          },
          {
            'date':'05/19/2022',
            'user_from':'u412',
            'user_to':'u579',
            'transaction_id':'1dlafjganwamad'
          },
        ]
      };
      
    return(
        <div >
            <MDBTable  style={{width:'70%'}} maxHeight="450px"  scrollY hover paging>
                <MDBTableHead  columns={data.columns} />
                
                <MDBTableBody>
                {data.rows.map((data)=>{
                    return(
                    <tr onClick={()=>{
                        console.log(data.id)
                    }}>
                        <td>{data.date}</td>
                        <td>{data.user_from}</td>
                        <td>{data.user_to}</td>
                        <td>{data.transaction_id}</td>
                    </tr>
                    )
                })}
                </MDBTableBody>
                
            </MDBTable>
        </div>
    );
};
export default ItemExchanges