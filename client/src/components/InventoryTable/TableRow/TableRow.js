import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {ItemNameComponent} from "./ItemNameComponent/ItemNameComponent";
import "./TableRow.css";
import {useEffect, useState} from 'react';
import {TableModal} from '../TableModal/TableModal';

export const TableRow = (props) =>{
  const name = props.name;
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
        <ItemNameComponent/>
        </Col>
        <Col className="m-auto date">05/25/2022</Col>
        <Col className ="m-auto">
<div className="serial_number">{props.serial}</div></Col>
        <Col className="m-auto"><div className="location">Putian, China</div></Col>
      </Row>
      <div className="seperator"></div>
    </Container>
    <TableModal showModal={showModal} toggleModal={setShowModal}/>
    </>
  )
}