import {useState,createElement,useEffect} from 'react';
import ReactDOM from 'react-dom'
import {Table,Row,Col,Container,Form,Button} from 'react-bootstrap';
import FlipCard from './FlipCard'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios'
import './InventoryTab.css';
const InventoryTab =(props)=>{
  //const [inventoryList,setInventoryList]=useState([])
  const [publicProfile,setPublicProfile]=useState(false)
  const [inventory, setInventory]=useState([])
  const [entireList, setEntireList]=useState([])
  useEffect(async()=>{
    console.log("rerendering inside inventorytab")
    if(props.public===true){
      setPublicProfile(true)
    }

    let templist=[]
    for(let i=0;i<props.user.items.length;i++){
      let itemId=props.user.items[i]
      let response=await axios.get(`/item/get/${itemId}`)
      let item=response.data.item
      templist.push(item)
    }
    
    setEntireList(templist)

    let newInventoryList=[]
    for(let i=0;i<templist.length;i+=3){
      newInventoryList.push(templist.slice(i, i+3));
    }
    setInventory(newInventoryList)
  }, []);

  const handleSearch=(e)=>{
    let search=e.target.value.toLowerCase()
    let temp=[]
    let filter=entireList.filter(item=>item.name.toLowerCase().includes(search))
    while(filter.length){
      temp.push(filter.splice(0, 3))
    }
    setInventory(temp)
  }


  if(publicProfile){
    return(
        <Container >
        <Row>
        <Form.Control onChange={handleSearch} style={{width:'50%'}} placeholder="Search"></Form.Control>
        </Row>
            <div style={{height:'500px',overflow:'scroll'}} >
            {
              inventory.map((row)=>
                <Row>
                  {
                    row.map((col,i)=>{
                      return <Col>
                        <FlipCard key={col} curr_user={props.curr_user} user={props.user} public={true} index={i} item={col}></FlipCard>
                      </Col>
                    })
                  }
                </Row>
              )
            }
            </div>
        </Container>
    )
  }
  else{
    return(
        <Container >
        <Row>
        <Form.Control onChange={handleSearch} style={{width:'50%'}} placeholder="Search"></Form.Control>
        </Row>
            <div style={{height:'500px',overflow:'scroll'}} >
            {
              inventory.map((row)=>
                <Row>
                  {
                    row.map((col,i)=>{
                      return <Col>
                        <FlipCard key={col} public={false} index={i} item={col}></FlipCard>
                      </Col>
                    })
                  }
                </Row>
              )
            }
            </div>
        </Container>
    )
  }
};
export default InventoryTab