const express = require("express");
const router = express.Router();

function routes(app) {
  router.get("/todos", (req, res) => {
    const todos = [
      {
          name:'todo1',
          id:1
      },
      {
          name:'todo2',
          id:2
      }
  ]
    res.send(JSON.stringify(todos));
  });
  
  router.get("/todos/:id", (req, res) => {
    res.send(JSON.stringify({name:"Sirji",id:req.params.id}))
  });

  return router;
};

module.exports = routes;