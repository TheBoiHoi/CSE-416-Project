import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./TableHead.css"


export const TableHead = () =>{
  return (
    <Container className="table_head_container">
      <Row className="table_head_row">
        <Col className="table_label">Item Name</Col>
        <Col className="table_label">Date Created</Col>
        <Col className="table_label">Serial Number</Col>
        <Col className="table_label">Location</Col>
      </Row>
      <div className="seperator"></div>
    </Container>
  )
}