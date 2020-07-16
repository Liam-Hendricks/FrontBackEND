import React from "react";
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { Component } from "react";

//const crud = require('../Modules/CRUD.js');

class Add extends Component {
    


  render() {
    const { nextID,titleChange,descriptionChange,urlChange,submit} = this.props;
    return (
        <Card>
        <Card.Body>
          <Form id="form" onSubmit={submit}>
            <Row>
              <Col>
                <Form.Control  value={nextID}  readOnly={true}/>
              </Col>
              <Col>
                <Form.Control placeholder="Title"  id="title"  name="title"  onChange={titleChange} />
              </Col>
              <Col>
                <Form.Control placeholder="Description" id="description" name="description" onChange={descriptionChange} />
              </Col>
              <Col>
                <Form.Control placeholder="URL" id="url" name="url" onChange={urlChange}  />
              </Col>

              <Col>
                <Button variant="primary" type="submit">
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default Add;
