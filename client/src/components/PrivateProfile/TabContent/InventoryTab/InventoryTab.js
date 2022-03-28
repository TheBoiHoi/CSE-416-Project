import * as React from 'react';
import {Table} from 'react-bootstrap';
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
        <div >
            <MDBTable maxHeight="450px" borderless scrollY>
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
            </MDBTable>
        </div>
    );
};
export default InventoryTab