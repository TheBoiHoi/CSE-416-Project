import {TableHead} from "../TableHead/TableHead";
import {TableRow} from "../TableRow/TableRow";
import "./InventoryTable.css";
import axios from 'axios'



export  const InventoryTable  = (props) => {
  
  console.log("company:", props.company)
  if(props.company){
    console.log(props.company.name)
    const items = props.company.items

    let test = new Array()
    let itemList = items.map( async (id)=>{
      const response = await axios.get(`http://localhost:3000/company/getItem/${id}`)
      return structuredClone(response.data.item)
    })
    console.log(itemList)
    console.log(test)
    return(
      <div className="inventory_table">
        <TableHead/>
        <div className="table_head_seperator"></div>
        <div className="inventory_rows" >
          {itemList.map((index)=>{
            console.log("row")
            return <TableRow item = {index} company = {props.company}/>;
            
          })}
        </div>
      </div>)
  }else{
    return null
  }
  
  
}