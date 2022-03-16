import {TableHead} from "../TableHead/TableHead";
import {TableRow} from "../TableRow/TableRow";
import "./InventoryTable.css";
export const InventoryTable = (props) => {
  return(
    <div className="inventory_table">
      <TableHead/>
      <div className="inventory_rows">
        <TableRow/>
        <TableRow/>
        <TableRow/>
        <TableRow/>
        <TableRow/>
      </div>
    </div>
    
  )
}