//const todoControllers = require("../controller/todoController");
// module.exports = app => {
     const todos = require("../controller/todoController");
  
    var router = require("express").Router();
  
    // Create a new Todo
    router.post("/create", todos.create);
  
    // Retrieve all todos
    router.get("/", todos.findAll);
  
    // Retrieve all published todos
    router.get("/published", todos.findAllPublished);
  
    // Retrieve a single Todo with id
    router.get("/:id", todos.findOne);
  
    // Update a Todo with id
    router.put("/edit:id", todos.update);
  
    // Delete a Todo with id
    router.delete("/delete:id", todos.delete);
  
    // Create a new Todo
    router.delete("/deleteAll", todos.deleteAll);
  
    // app.use('/api/', router);
  
 //};
  module.exports = router;