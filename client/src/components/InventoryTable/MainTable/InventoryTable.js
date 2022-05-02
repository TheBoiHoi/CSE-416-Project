import {TableHead} from "../TableHead/TableHead";
import {TableRow} from "../TableRow/TableRow";
import "./InventoryTable.css";
import axios from 'axios'

let itemParams = {
  asset_id: 0,
  manu_date: "",
  manu_location: "",
  manu_owner: "",
  name: "",
  owner: "",
  serial_number: 0
}
const getItemInfoById = async (id) =>{
  const response = await axios.get(`http://localhost:3000/company/getItem/${id}`)
  itemParams.asset_id = response.data.item.asset_id
  itemParams.manu_date = response.data.item.manu_date
  itemParams.manu_location = response.data.item.manu_location
  itemParams.manu_owner = response.data.item.manu_owner
  itemParams.name = response.data.item.name
  itemParams.owner = response.data.item.owner
  itemParams.serial_number = response.data.item.serial_number
}

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
            getItemInfoById(id)
            return <TableRow item = {itemParams} company = {props.company}/>;
          })}
        </div>
      </div>)
  }else{
    return null
  }
  
  
}