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
    TodoModel.create(req.body, (error, data) => { 

        // validation request
        if (!req.body.title || !req.body.desc || !req.body.imageUrl || !req.body.date) {
            return res.status(400).send({message: "Required field Cant be empty"})
        }
        console.log(req.body)
        // * Create a Task
        const task = new TodoModel({
            title: req.body.title,
            desc: req.body.desc,
            imageUrl: req.body.imageUrl,
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
