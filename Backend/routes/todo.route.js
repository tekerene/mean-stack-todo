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

todoRoute.route('/create').post((req, res, next) => {
    TodoModel.create(req.body, (error, data) => { // validation request
         console.log(req.body)
        if (!req.body.title || !req.body.desc || !req.body.imageUrl || !req.body.date) {
            return res.status(400).send({message: "Required field Cant be empty"})
        }
        // * Create a Task
        const task = new TodoModel({
            imageUrl: req.body.imageUrl, 
            title: req.body.title, 
            description: req.body.desc,
            date: req.body.date
        })
        // Save save to database
        task.save((err) => {
            if (err) {
                res.send('err')
                console.log(err)
            } else {
                res.send(data)
            }
        })
    })
})

// task.save().then((data)=>{
//   res.send(data);
// }).catch((er)=>{
//   res.status(500).send({
//     message:  "Some Errors While Creating This Task"
//   })
// })

    // if (!req.body.title) {
    //   res.status(400).send({ message: "Content can not be empty!" });
    //   return;
    // }
  
    // Create a Todo
    // const todo = new Todo({
    //   title: req.body.title,
    //   description: req.body.desc,
    //   imageUrl: req.body.image,
    //   published: req.body.published ? req.body.published : false
    // });
  
    // Save Todo in the database
    // todo
    //   .save(todo)
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the Todo."
    //     });
    //   });
    // })



todoRoute.route('/edit/:id').get((req, res) => {
    TodoModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update todo
todoRoute.route('/update/:id').post((req, res, next) => {
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
todoRoute.route('/delete/:id').delete((req, res, next) => {
    TodoModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({msg: data})
            console.log("hello")
        }
    })
})
 
module.exports = todoRoute;
