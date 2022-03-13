import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ItemNameComponent} from "./ItemNameComponent/ItemNameComponent";
import "./TableRow.css"

export const TableRow = () =>{
  return (
    <Container className="table_row_container">
      <Row>
        <Col>
        <ItemNameComponent/>
        </Col>
        <Col className="m-auto date">05/25/2022</Col>
        <Col className ="m-auto">
<div className="serial_number">5yd75E4WW7zEZndm</div></Col>
        <Col className="m-auto"><div className="location">Putian, China</div></Col>
      </Row>
      <div className="seperator"></div>
    </Container>
  )
}