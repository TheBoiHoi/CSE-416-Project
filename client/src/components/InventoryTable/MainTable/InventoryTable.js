import {TableHead} from "../TableHead/TableHead";
import {TableRow} from "../TableRow/TableRow";
import "./InventoryTable.css";

export const InventoryTable = (props) => {
  console.log("company:", props.company)
  if(props.company){
    console.log("testing")
    console.log(props.company.name)
    const items = props.company.items
    console.log(items)
    let temp = Array(items.length).fill(0);
    
    return(
      <div className="inventory_table">
        <TableHead/>
        <div className="table_head_seperator"></div>
        <div className="inventory_rows" >
          {items.map((id)=>{
            return <TableRow serial = {id}/>;
          })}
        </div>
      </div>)
  }else{
    return null
  }
  
  
}