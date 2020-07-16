import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Items from "./Components/items";
import Edit from "./Components/edit";
import Add from "./Components/add";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
const crudMethods = require('./Modules/CRUD.js');
const myFunctions =require('./Modules/HelperFunctions.js');

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
    crudMethods.READ()
    .then((result)=> this.setState({ Projects: result.data}))
    .then(()=>this.createID())
    .catch((error) => this.setState({error })); 
  
  }
  //this event handles api post 
  handleSubmit(e) {
    const { nextID, title, description, url } = this.state;
    crudMethods.CREATE(nextID, title, description, url ).then(this.componentDidMount());
    e.preventDefault();
  }
  //this event handles deleting projects
  handleClick(id) {
    crudMethods.DELETE(id).then(()=>this.componentDidMount());
   
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
      //setting the object that is being edited
    this.setState({ EditObj: myFunctions.filterArray(this.state.Projects,id) });
  }
  //event handler gets the maxium id value and sets the nextID value
  createID() {
  
    this.setState({ nextID: myFunctions.FindMax(this.state.Projects) });
  }
  //event for reloading component when exiting the edit component
  Editing(e) {
    
    this.componentDidMount();
  }

  render() {
    const { error, Projects,nextID } = this.state;
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
             {/* this route uses a render to handle two components rendering with one path */}
            <Route exact={true} path="/"
              render={() => (
                <Container style={style}>
                  <Items
                    data={Projects}
                    eventHandler={this.handleClick}
                    updateHandler={this.updateHandler}
                  />
                  <Add 
                    nextID={nextID} 
                    titleChange={this.handleChangeTitle} 
                    descriptionChange={this.handleChangeDescription} 
                    urlChange={this.handleChangeURL} 
                    submit={this.handleSubmit}
                  />
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


