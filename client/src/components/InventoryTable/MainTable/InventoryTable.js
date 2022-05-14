import {TableHead} from "../TableHead/TableHead";
import {TableRow} from "../TableRow/TableRow";
import "./InventoryTable.css";
import axios from 'axios'

export const InventoryTable  = (props) => {
  console.log("filter:" + props.filter)
  console.log("the company is ", props.company)
  // console.log("company:", props.company)
  if(props.company && props.company.isCompany){
    
    return(
      <div className="inventory_table">
        <TableHead/>
        <div className="table_head_seperator"></div>
        <div className="inventory_rows" >
          {props.company.items.map((element)=>{
            return <TableRow filter={props.filter} itemId={element} company = {props.company}/>;
            
          })}
        </div>
      </div>)
  }
  return null
  
  
}