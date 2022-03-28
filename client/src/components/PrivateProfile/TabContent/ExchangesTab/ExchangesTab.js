import * as React from 'react';
import {Table} from 'react-bootstrap'
import ShoeImg from '../../../../img/airmags.jpg'
import { MDBTable, MDBTableBody, MDBTableHead,MDBDataTable } from 'mdbreact';
const ExchangesTab=(props)=>{
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
            label: 'Date',
            field: 'date',
            sort: 'asc'
          },
          {
            label: 'From/To',
            field: 'other',
            sort: 'asc'
          },
          {
            label: 'Exchange Type',
            field: 'type',
            sort: 'asc'
          },
        ],
        rows: [
          {
            'id': '1',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
          {
            'id': '2',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
          {
            'id': '5yd75E4WW7zEZndm',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
          {
            'id': '5yd75E4WW7zEZndm',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
          {
            'id': '5yd75E4WW7zEZndm',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
          {
            'id': '5yd75E4WW7zEZndm',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
          {
            'id': '5yd75E4WW7zEZndm',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
          {
            'id': '5yd75E4WW7zEZndm',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
          {
            'id': '5yd75E4WW7zEZndm',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
          {
            'id': '5yd75E4WW7zEZndm',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
          {
            'id': '5yd75E4WW7zEZndm',
            'item': 'Yeezy Slides',
            'date':'05/19/2022',
            'other':'1xdasdwatadfagag',
            'type':'BUY'
          },
        ]
      };
      
    return(
        <div >
            <MDBTable  maxHeight="450px" borderless scrollY hover paging>
                <MDBTableHead  columns={data.columns} />
                <MDBTableBody>
                {data.rows.map((data)=>{
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