import React, { Component } from "react";
import "./App.css";
import { Container, Form, Col, Row, Card, Button } from "react-bootstrap";
import Items from "./Components/items";
import Edit from "./Components/edit";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    //binding event handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeURL = this.handleChangeURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createID = this.createID.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.Editing = this.Editing.bind(this);
    //setting state
    this.state = {
      Projects: [],
      EditObj: {},
      nextID: "",
      title: "",
      description: "",
      url: "",
     
    };
  }
  //this fetch gets the current data from web_projects.json
  componentDidMount() {
    console.log("componentDidMount");
    fetch("/projects")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Result");
          this.setState({
            Projects: result.data,
          });
          //calling the createID handler
          this.createID();
        },
        (error) => {
          console.log(error);
          this.setState({
            error,
          });
        }
      );
  }
  //this event handles api post 
  handleSubmit(e) {
    const { nextID, title, description, url } = this.state;
    fetch("/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: nextID,
        title: title,
        description: description,
        link: url,
      }),
    })
      .then((res) => res.json())
      
      .then((response) => this.componentDidMount())//if the Post is successfull then get the update data
      .catch((error) => console.log("Error:", error));
    e.preventDefault();
  }
  //this event handles deleting projects
  handleClick(id) {
    fetch("/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((response) => console.log(`item with id:${id} removed`))
      .then(() => this.componentDidMount())
      .catch((error) => console.log("Error:", error));
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
  //event handler changes state data
  updateHandler(id) {
    let array = this.state.Projects;
    let filtered = array.filter(function (el) {
      return el.id === id;
    });
    this.setState({ EditObj: filtered[0] });
  }
  //event handler gets the maxium id value and sets the nextID value
  createID() {
    let array = this.state.Projects;
    var max = array.reduce(function (prev, current) {
      if (+current.id > +prev.id) {
        return current;
      } else {
        return prev;
      }
    });
    let value = max.id + 1;
    this.setState({ nextID: value });
  }
  //event for reloading component when exiting the edit component
  Editing(e) {
    
    this.componentDidMount();
  }

  render() {
    const { error, Projects } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else
      return (
        <div className="App">
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossOrigin="anonymous"
          />
          <BrowserRouter>
            <Route
              exact={true}
              path="/"
              render={() => (
                <Container style={style}>
                  <Items
                    data={Projects}
                    eventHandler={this.handleClick}
                    updateHandler={this.updateHandler}
                  />
                  <Card>
                    <Card.Body>
                      <Form id="form" onSubmit={this.handleSubmit}>
                        <Row>
                          <Col>
                            <Form.Control
                              value={this.state.nextID}
                              readOnly={true}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              placeholder="Title"
                              id="title"
                              name="title"
                              onChange={this.handleChangeTitle}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              placeholder="Description"
                              id="description"
                              name="description"
                              onChange={this.handleChangeDescription}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              placeholder="URL"
                              id="url"
                              name="url"
                              onChange={this.handleChangeURL}
                            />
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
                </Container>
              )}
            />
            <Route
              path="/Edit"
              render={() => (
                <Edit data={this.state.EditObj} eventHandle={this.Editing} />
              )}
            />
          </BrowserRouter>
        </div>
      );
  }
}
const style = {
  paddingTop: "50px",
};
export default App;
