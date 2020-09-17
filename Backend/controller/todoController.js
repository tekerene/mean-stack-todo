

/**
 * @todo controller to create, findAll, fineOne, update, delete, deleteAll,
 */
 //Const todoSchema = require('../models/todoSchema');
const Todo = require("../models/TodoSchema");


exports.create = (req, res)=>{

  // validation request

  if (!req.body.title){
    return res.status(400).send({
      message: "Required field Cant be empty ttt",
    })
  }
  console.log(req.body)

  // * Create a Task
  const task = new Todo({
    title: req.body.title,
    desc: req.body.desc,
     imageUrl: req.body.imageUrl,
    date: req.body.date,
  });
  // Save save to database
task.save((err)=>{
  if(err){
    res.send('err')
    console.log(err)
  }
  else{
    res.send(req.body)
  
  }
})
  // task.save().then((data)=>{
  //   res.send(data);
  // }).catch((er)=>{
  //   res.status(500).send({
  //     message:  "Some Errors While Creating This Task"
  //   })
  // })
}

  /**
   * find all todos
   */

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Todo.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving todos."
        });
      });
  };

   /**
   * find one todos
   */
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Todo.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Todo with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Todo with id=" + id });
      });
  };

  /**
   * Update a todo
   */

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`
          });
        } else res.send({ message: "Todo was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Todo with id=" + id
        });
      });
  };


  /**
   * @Delete one todo
   */

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Todo.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
          });
        } else {
          res.send({
            message: "Todo was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Todo with id=" + id
        });
      });
  };

  /**
   * @Delete all todo
   */

  exports.deleteAll = (req, res) => {
    Todo.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Todos were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Todos."
        });
      });
  };

  /**
   * @Find all todos published
   */

  exports.findAllPublished = (req, res) => {
    Todo.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Todos."
        });
      });
  };