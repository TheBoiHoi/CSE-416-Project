import {useState,createElement,useEffect} from 'react';
import ReactDOM from 'react-dom'
import {Table,Row,Col,Container} from 'react-bootstrap';
import FlipCard from './FlipCard'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import './InventoryTab.css';
const InventoryTab =(props)=>{
  //const [inventoryList,setInventoryList]=useState([])
  const [publicProfile,setPublicProfile]=useState(false)
  useEffect(()=>{
    console.log("printing props.user")
    console.log(props.user)
    if(props.public===true){
      setPublicProfile(true)
    }
    //setInventoryList(props.user.items)
  },[]);
  let templist=[]
  for(let i=0;i<props.user.items.length;i++){
    templist.push(props.user.items[i])
  }
  let newInventoryList=[]
  while(templist.length){
    newInventoryList.push(templist.splice(0,3))
  }

  // const data = {
  //     columns: [
  //       {
  //         label: 'ID',
  //         field: 'id',
  //         sort: 'asc'
  //       },
  //       {
  //         label: 'Item',
  //         field: 'item',
  //         sort: 'asc'
  //       },
  //       {
  //         label: 'Color',
  //         field: 'color',
  //         sort: 'asc'
  //       },
  //     ],
  //     rows: [
  //       {
  //         'id': 1,
  //         'item': 'Yeezy Slides',
  //         'color':'Blue'
  //       },
  //     ]
  //   };

  
  if(publicProfile){
    return(
        <Container >
            {/* <MDBTable maxHeight="450px" borderless scrollY>
                <MDBTableHead  columns={data.columns} />
                <MDBTableBody>
                {data.rows.map((data)=>{
                    return(
                    <tr onClick={()=>{
                        console.log(data.id)
                    }}>
                        <td>{data.id}</td>
                        <td>{data.item}</td>
                        <td>{data.color}</td>
                    </tr>
                    )
                })}
                </MDBTableBody>
                
            </MDBTable> */}
            <div style={{height:'500px',overflow:'scroll'}} >
            {
              newInventoryList.map((row,i)=>
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
            <div style={{height:'500px',overflow:'scroll'}} >
            {
              newInventoryList.map((row)=>
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