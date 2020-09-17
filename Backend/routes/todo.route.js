const express = require('express');
const todoRoute = express.Router();

// todo model
let TodoModel = require('../models/TodoSchema');

todoRoute.route('/').get((req, res) => {
    TodoModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 todoRoute.route('/create-todo').post((req, res, next) => {
    TodoModel.create(req.body, (error, data) => {
   if (!req.body.title){
    res.status(400).send({ message: "Content can not be empty!" });
    
      if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }
  // Create a Todo
  const todo = new TodoModel({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });
  })
});

todoRoute.route('/edit-todo/:id').get((req, res) => {
   TodoModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update todo
todoRoute.route('/update-todo/:id').post((req, res, next) => {
  TodoModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('todo successfully updated!')
    }
  })
})

// Delete todo
todoRoute.route('/delete-todo/:id').delete((req, res, next) => {
  TodoModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = todoRoute;