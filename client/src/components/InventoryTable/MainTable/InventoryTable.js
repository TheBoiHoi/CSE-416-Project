import {TableHead} from "../TableHead/TableHead";
import {TableRow} from "../TableRow/TableRow";
import "./InventoryTable.css";
import axios from 'axios'



export  const InventoryTable  = (props) => {
  console.log("filter:" + props.filter)
  // console.log("company:", props.company)
  if(props.company){
    const items = props.company.items

    let itemId = new Array()
    let itemList = items.map( async (id)=>{
      itemId.push(id)
      const response = await axios.get(`http://localhost:3000/company/getItem/${id}`)
      return structuredClone(response.data.item)
    })

    return(
      <div className="inventory_table">
        <TableHead/>
        <div className="table_head_seperator"></div>
        <div className="inventory_rows" >
          {itemList.map((element,index)=>{
            return <TableRow itemId={itemId[index]}item = {element} company = {props.company}/>;
            
          })}
        </div>
      </div>)
  }else{
    return null
  }
  
  
}