import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {ItemNameComponent} from "./ItemNameComponent/ItemNameComponent";
import "./TableRow.css";
import {useEffect, useState} from 'react';
import {TableModal} from '../TableModal/TableModal';

let asset_id 
let manu_date 
let manu_location 
let manu_owner 
let name 
let owner
let serial_number

const setUp = async(promise)=>{  
  await promise.then((val)=>{
      asset_id = val.asset_id
      manu_date = val.manu_date
      manu_location = val.manu_location
      manu_owner = val.manu_owner
      name = val.name
      owner = val.owner
      serial_number = val.serial_number
    })
}
export const TableRow = (props) =>{

  const promise = props.item;

  setUp(promise)

  let currItem = {
    asset_id: asset_id,
    manu_date:manu_date, 
    manu_location :manu_location,
    manu_owner :manu_owner,
    name :name,
    owner:owner,
    serial_number:serial_number
  }
  const [background,setBackground] = useState("table_row_container");

  const [showModal,setShowModal] = useState(false);

  const [transferOwnerShip, setTransferOwnership] = useState(false);

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
      <Row>
        <Col>
        <ItemNameComponent name = {name}/>
        </Col>
        <Col className="m-auto date">{currItem.manu_date}</Col>
        <Col className ="m-auto">
        <div className="serial_number">{currItem.serial_number}</div></Col>
        <Col className="m-auto"><div className="location">{currItem.manu_location}</div></Col>
      </Row>
      <div className="seperator"></div>
    </Container>
    <TableModal itemId={props.itemId} company = {props.company} item = {currItem} showModal={showModal} toggleModal={setShowModal}/>
    </>
  )
}