import {TableHead} from "../TableHead/TableHead";
import {TableRow} from "../TableRow/TableRow";
import "./InventoryTable.css";
import axios from 'axios'

export const InventoryTable  = (props) => {
  console.log("filter:" + props.filter)
  console.log("the company is ", props.company)
  // console.log("company:", props.company)
  if(props.company && props.company.isCompany){
    // const items = props.company.items

    // let itemId = new Array()
    // let itemList = items.map( async (id)=>{
    //   itemId.push(id)
    //   const response = await axios.get(`item/get/${id}`)
    //   console.log(response.data.item)
    //   return (response.data.item)
    // })
    
    return(
      <div className="inventory_table">
        <TableHead/>
        <div className="table_head_seperator"></div>
        <div className="inventory_rows" >
          {props.company.items.map((element)=>{
            return <TableRow itemId={element} company = {props.company}/>;
            
          })}
        </div>
      </div>)
  }
  return null
  
  
}