import {useState,createElement,useEffect} from 'react';
import ReactDOM from 'react-dom'
import {Table,Row,Col,Container} from 'react-bootstrap';
import {FlipCard} from './FlipCard'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import './InventoryTab.css';
const InventoryTab =(props)=>{
  const [inventoryList,setInventoryList]=useState([])
  const [publicProfile,setPublicProfile]=useState(false)
  let templist =[]
  useEffect(()=>{
    console.log("printing props.user")
    console.log(props.user)
    if(props.public===true){
      setPublicProfile(true)
    }
    console.log(props.user.items)
    templist=props.user.items
    console.log(templist)
    //setInventoryList(props.user.items)
    //console.log(inventoryList)
  },[]);



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
            {templist.map((inv,i)=>
            (i+1)%3===0? (
              <Row>
                {" "}
                <></>
                {Array(3).fill().map((el,index)=>{
                  return <Col>
                    <FlipCard item={el} public={true}></FlipCard>
                  </Col>
                })}
                {" "}
              </Row>
            ): (
              <></>
            )
            )}
            </div>
        </Container>
    )
  }
  else{
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
            {templist.map((inv,i)=>
            (i+1)%3===0? (
              <Row>
                {" "}
                <></>
                {Array(3).fill().map((el,index)=>{
                  return <Col>
                    <FlipCard item={el}></FlipCard>
                  </Col>
                })}
                {" "}
              </Row>
            ): (
              <></>
            )
            )}
            </div>
        </Container>
    )
  }
};
export default InventoryTab