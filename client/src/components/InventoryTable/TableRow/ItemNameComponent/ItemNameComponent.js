import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image'
import air_mag from "../../../../img/airmags2.jpg";
import "./ItemNameComponent.css";

export const ItemNameComponent = (props) =>{
  return (
    <Row className="item_name_row">
          <Col>
            <img src={`http://localhost:3000/profile-pic/get/${props.itemId}`} alt={"Not Found"} className="shoe_img"/>
          </Col>
          <Col className="name_description">
            <Row>{props.name}</Row>
          </Col>
        </Row>
  )
}