import {TableHead} from "../TableHead/TableHead";
import {TableRow} from "../TableRow/TableRow";
import "./InventoryTable.css";


export const InventoryTable = (props) => {
  let temp = Array(10).fill(0);
  return(
    <div className="inventory_table">
      <TableHead/>
      <div className="table_head_seperator"></div>
      <div className="inventory_rows">
        {temp.map(()=>{
          return <TableRow/>;
        })}
      </div>
    </div>
    
  )
}