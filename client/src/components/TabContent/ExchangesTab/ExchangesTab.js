import * as React from 'react';
import {Table} from 'react-bootstrap'
import ShoeImg from '../../../img/airmags.jpg'
const ExchangesTab=(props)=>{
    return(
        <Table  hover>
        <thead   >
            <tr style={{border:"hidden"}} >
            <th>Item</th>
            <th>Date</th>
            <th>ID</th>
            <th>From/To</th>
            <th>Exchange Type</th>
            </tr>
        </thead>
        <tbody>
            <tr style={{border:"hidden"}} >
            <td>
            Hello
            </td>
            <td>5/19/2022</td>
            <td>5yd75E4WW7zEZndm</td>
            <td>1xdasdwatadfagag</td>
            <td>Buy</td>
            </tr>
        </tbody>
        <tbody>
            <tr style={{border:"hidden"}} >
            <td>
            Hello
            </td>
            <td>5/19/2022</td>
            <td>5yd75E4WW7zEZndm</td>
            <td>1xdasdwatadfagag</td>
            <td>Buy</td>
            </tr>
        </tbody>
        <tbody>
            <tr style={{border:"hidden"}} >
            <td>
            Hello
            </td>
            <td>5/19/2022</td>
            <td>5yd75E4WW7zEZndm</td>
            <td>1xdasdwatadfagag</td>
            <td>Buy</td>
            </tr>
        </tbody>
        </Table>
    );
};
export default ExchangesTab