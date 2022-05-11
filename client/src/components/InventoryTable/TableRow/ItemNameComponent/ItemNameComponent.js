import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image'
import air_mag from "../../../../img/airmags2.jpg";
import temp from "../../../../img/temp.jpg";
import "./ItemNameComponent.css";
import React, {useEffect, useState} from 'react';

export const ItemNameComponent = (props) =>{
  const[srcLink,setSrcLink] = useState(`http://localhost:3000/profile-pic/get/${props.itemId}`);
  return (
    <Row className="item_name_row">
          <Col>
            <img src={srcLink} onError={()=>setSrcLink(temp)} className="shoe_img"/>
          </Col>
          <Col className="name_description">
            <Row>{props.name}</Row>
          </Col>
        </Row>
  )
}