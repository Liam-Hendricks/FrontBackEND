const express = require("express");
const helmet = require('helmet')
const app = express();
const fileHandler = require("fs");
const bodyParser = require('body-parser');
const path = require('path');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 3001;


//get method 
app.get("/projects", function (req, res) {
  fileHandler.readFile("web_project.json", (err, data) => {
    if (err) {
        res.json({"message": 'File not found. First post to create file.'});

    } else {
        let Data = JSON.parse(data);
      res.json({"data":Data.Web_projects});
    }
  });
});
//post method
app.post("/project", (req, res) => {
  console.log('app.post');
  var item = {

    id: parseInt(req.body.id),
    title: req.body.title,
    description: req.body.description,
    URL: req.body.link,
  };
  //read web project json file
  fileHandler.readFile("web_project.json", (err, data) => {
    if (err) {
      res.send("File not found. First post to create file.");
    } else {
      //get the json data
      let webproject = JSON.parse(data);
      //get the array
      let array = webproject.Web_projects;
      //add object to array
      array.push(item);
      //create new json string
      let newdata = `{"Web_projects":${JSON.stringify(array)}}`;
      //write the string into the file
      fileHandler.writeFile("web_project.json", newdata, (err) => {
        if (err) throw err;
        res.json({"message": "data added"});
      });
    }
  });
});
//delete method
app.delete("/delete", (req, res) => {
  //read web project json file 
  fileHandler.readFile("web_project.json", (err, data) => {
    if (err) {
      res.send("File not found. First post to create file.");
    } else {
        //parse json data
      let webproject = JSON.parse(data);
      //get array 
      let array = webproject.Web_projects;
      //filter out the object we want to delete using the id 
      var filtered = array.filter(function (el) {
        return el.id != parseInt(req.body.id);
      });
      //creating new json string using the filtered array
      let newdata = `{"Web_projects":${JSON.stringify(filtered)}}`;
      //write string to web_project.json
      fileHandler.writeFile("web_project.json", newdata, (err) => {
        if (err) throw err;
        res.json( {"message":`Project with ID:${req.body.id} has been deleted`});
        
      });
    }
  });
});
//put method
app.put("/update", (req, res) => {
    //read web project file
  fileHandler.readFile("web_project.json", (err, data) => {
    if (err) {
      res.send("File not found. First post to create file.");
    } else {
      //parse json data 
      let webproject = JSON.parse(data);
      //get array
      let array = webproject.Web_projects;
      //filter array for the object where id is equal to one parse in params
      let filtered = array.filter(function (el) {
        return el.id == parseInt(req.body.id);
      });
      //edit the oject using the params data
      filtered[0].title = req.body.title;
      filtered[0].description = req.body.description;
      filtered[0].URL=req.body.link;
      //remove the old object
      let newFilter = array.filter(function (el) {
        return el.id != parseInt(req.body.id);
      });
      //add new updated object
      newFilter.push(filtered[0]);
      //create json string
      let newdata = `{"Web_projects":${JSON.stringify(newFilter)}}`;
      //update file
      fileHandler.writeFile("web_project.json", newdata, (err) => {
        if (err) throw err;
        res.json({"message":`Updated project with ID:${req.body.id}`});
      });
    }
  });
});

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'project-app/build')));
 
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/project-app/build/index.html'));
  });
 
}

// app.use(express.static(path.join(__dirname,'project-app/build')));

app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Open http://localhost:${PORT}`
  );
});
