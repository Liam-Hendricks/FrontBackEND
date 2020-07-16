import React from "react";
import { Card, Form, Button, Col, Row, Container } from "react-bootstrap";
import { Component } from "react";
import { Link } from "react-router-dom";
const crud = require('../Modules/CRUD.js');

class Edit extends Component {
    //setting current project data the user is editing in state
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      id: data.id,
      title: data.title,
      description: data.description,
      url: data.URL,
    };
    //binding event handlers
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeURL = this.handleChangeURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }
  //when submit is click the new updated data is send to the PUT api endpoint
  handleSubmit(e) {
    const { id, title, description, url } = this.state;
    crud.UPDATE(id,title,description,url);
    e.preventDefault();
  }
  //event handler changes state data
  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }
  //event handler changes state data
  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }
  //event handler changes state data
  handleChangeURL(event) {
    this.setState({ url: event.target.value });
  }

  render() {
    const { id, title, description, url } = this.state;
    return (
      <Container style={container}>
        <Card style={card}>
          <Card.Body>
            <Form id="form" onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Label htmlFor="id">ID</Form.Label>
                  <Form.Control value={id} id="id" readOnly={true} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label htmlFor="title">Title</Form.Label>
                  <Form.Control
                    value={title}
                    id="title"
                    name="title"
                    onChange={this.handleChangeTitle}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label htmlFor="description">Description</Form.Label>
                  <Form.Control
                    value={description}
                    id="description"
                    name="description"
                    onChange={this.handleChangeDescription}
                    style={style}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label htmlFor="url">URL</Form.Label>
                  <Form.Control
                    value={url}
                    id="url"
                    name="url"
                    onChange={this.handleChangeURL}
                  />
                </Col>
              </Row>
              <Row style={{ paddingTop: "10px" }}>
                <Col>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
                <Col>
                  <Link to="/">
                    <Button
                      variant="danger"
                      onClick={() => this.props.eventHandle()}
                    >
                      close
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
//inline css
const style = {
  height: "200px",
};
const card = {
  width: "450px",
  marginRight: "auto",
  marginLeft: "auto",
};
const container = {
  paddingTop: "50px",
};
export default Edit;
