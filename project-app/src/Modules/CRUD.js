
const config=require('../config/config.json');


module.exports={
  
  CREATE:function(nextID,title,description,url){
    fetch(config.url.POST, {
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
    .catch((error) => console.log("Error:", error));
  },

  READ:function(){
    return fetch(config.url.READ)
    .then((res) => res.json())
    .catch((error) => console.log("Error:", error)); 
  },

  UPDATE:function(id,title,description,url){
    fetch(config.url.UPDATE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          description: description,
          link: url,
        }),
      })
        .then((res) => res.json())
        .then((response) => alert("changes made"))
        .catch((error) => console.log("Error:", error));
  },

  DELETE:function(id){
    return fetch(config.url.DELETE, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      })
        .then((res) => res.json())
        .catch((error) => console.log("Error:", error)); 
  }

}
 
