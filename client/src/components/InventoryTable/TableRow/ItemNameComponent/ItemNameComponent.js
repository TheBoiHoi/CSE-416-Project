import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image'
import air_mag from "../../../../img/airmags2.jpg";
import "./ItemNameComponent.css";

export const ItemNameComponent = () =>{
  return (
    <Row className="item_name_row">
          <Col>
            <img src={air_mag} className="shoe_img"/>
          </Col>
          <Col className="name_description">
            <Row>Nike Air Mags</Row>
            <Row>Updated 1 day ago</Row>
          </Col>

        </Row>
  )
}