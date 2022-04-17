import * as React from 'react';
import {Table,Row,Col,Container} from 'react-bootstrap';
import {FlipCard} from './FlipCard'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import './InventoryTab.css';
const InventoryTab =(props)=>{
    const data = {
        columns: [
          {
            label: 'ID',
            field: 'id',
            sort: 'asc'
          },
          {
            label: 'Item',
            field: 'item',
            sort: 'asc'
          },
          {
            label: 'Color',
            field: 'color',
            sort: 'asc'
          },
        ],
        rows: [
          {
            'id': 1,
            'item': 'Yeezy Slides',
            'color':'Blue'
          },
        ]
      };
      
    return(
        <div class = "container-fluid">
            {/* <MDBTable maxHeight="450px" borderless scrollY>
                <MDBTableHead  columns={data.columns} />
                <MDBTableBody>
                {data.rows.map((data)=>{
                    return(
                    <tr onClick={()=>{
                        console.log(data.id)
                    }}>
                        <td>{data.id}</td>
                        <td>{data.item}</td>
                        <td>{data.color}</td>
                    </tr>
                    )
                })}
                </MDBTableBody>
                
            </MDBTable> */}
            <div >
            <div >
              <FlipCard></FlipCard>
            </div>
            
            
            </div>
        </div>
    );
};
export default InventoryTab