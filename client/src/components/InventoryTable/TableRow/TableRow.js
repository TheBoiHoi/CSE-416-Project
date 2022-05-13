import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {ItemNameComponent} from "./ItemNameComponent/ItemNameComponent";
import "./TableRow.css";
import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {TableModal} from '../TableModal/TableModal';

export const TableRow = (props) =>{
  
  const [background,setBackground] = useState("table_row_container");

  const [showModal,setShowModal] = useState(false);
  const [transferOwnerShip, setTransferOwnership] = useState(false);
  const [item, setItem]=useState(null)
  
  useEffect(()=>{
    axios.get(`/item/get/${props.itemId}`).then(response=>{
      setItem(response.data.item)
    })
  }, [])

  // const toggleModal =() =>{
  //   setShowModal(!showModal);
  // }
  return (
    <>
    <Container className={background} 
      onMouseEnter={()=>{
        setBackground("table_row_container_hover");
      }}
      onMouseLeave={()=>{
        setBackground("table_row_container");
      }}
      onClick={()=>{
        setShowModal(true);
      }}
    >
      {item&&<Row>
        <Col>
        <ItemNameComponent itemId={item.itemId} name = {item.name}/>
        </Col>
        <Col className="m-auto date">{item.manu_date}</Col>
        <Col className ="m-auto">
        <div className="serial_number">{item.serialNumber}</div></Col>
        <Col className="m-auto"><div className="location">{item.manu_location}</div></Col>
      </Row>}
      <div className="seperator"></div>
    </Container>
    {item&&<TableModal company = {props.company} item={item} showModal={showModal} toggleModal={setShowModal}/>}
    </>
  )
}