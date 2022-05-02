import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {ItemNameComponent} from "./ItemNameComponent/ItemNameComponent";
import "./TableRow.css";
import {useEffect, useState} from 'react';
import {TableModal} from '../TableModal/TableModal';
import axios from 'axios'


export const TableRow = (props) =>{
  const company = props.company;  
 
  const [background,setBackground] = useState("table_row_container");

  const [showModal,setShowModal] = useState(false);

  const [transferOwnerShip, setTransferOwnership] = useState(false);

  // const toggleModal =() =>{
  //   setShowModal(!showModal);
  // }

  return (
    <>
    <Container className={background} onMouseEnter={()=>{
      setBackground("table_row_container_hover");
    }}
    onMouseLeave={()=>{
      setBackground("table_row_container");
    }}
    onClick={()=>{
      setShowModal(true);
    }}
    >
      <Row>
        <Col>
        <ItemNameComponent name = {props.item.name}/>
        </Col>
        <Col className="m-auto date">{props.item.manu_date}</Col>
        <Col className ="m-auto">
        <div className="serial_number">{props.item.serial_number}</div></Col>
        <Col className="m-auto"><div className="location">{props.item.manu_location}</div></Col>
      </Row>
      <div className="seperator"></div>
    </Container>
    <TableModal item = {props.item} showModal={showModal} toggleModal={setShowModal}/>
    </>
  )
}