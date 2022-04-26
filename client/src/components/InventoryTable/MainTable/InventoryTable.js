
import {TableHead} from "../TableHead/TableHead";
import {TableRow} from "../TableRow/TableRow";
import "./InventoryTable.css";


export const InventoryTable = (props) => {
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
        {items.map((serial)=>{
          return <TableRow serial = {serial}/>;
        })}
      </div>
    </div>
    
  )
  }
  
}