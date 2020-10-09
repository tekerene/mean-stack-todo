const Todo = require('../models/Todo');;

exports.addTodos = (req, res) => {
    // * Create a Task
    const todo = new Todo({
        title: req.body.title,
        desc: req.body.desc,
        imageUrl: req.body.imageUrl,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        author: req.body.author,
        timeCreated: req.body.timeCreated,
        updateTime: req.body.updateTime,
        status: req.body.status,
    })
    console.log(req.body);
   
    // Save todo to database
    todo.save((err, data) => {
        if (err) {
            res.send('err')
            console.log(err)
        } else {
            res.send('ok')
            console.log(data +"todo successfully added")
        }
    })
}
// getting all task

exports.getTodos = (req, res, reqDate) => {
    
    Todo.find()
        .sort({
            _id: -1,
            status: 1
        })
        .then((task) => {

            res.status(200).send(task)
        })
        .catch((er) => {

            res.status(500).send({
                message: er.message || "Error Occured"
            })
        })
}
// getting one task
exports.getTodo = (req, res) => {
    Todo.findById(req.params.id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send({
                    message: 'Todo Not Found with id' + req.params.id
                })
            }
            res.status(200).send(todo)
            console.log(todo)
        })
        .catch((er) => {
            return res.status(500).send({
                message: 'Error retrieving todo with id' + req.params.id
            });
        });
}
// Deleting A Task With A Specific Id
exports.deleteTodo = (req, res) => {
    console.log('I am deleting')
    Todo.findByIdAndRemove(req.params.id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send({
                    message: 'Todo Not Found with id' + req.params.id
                })
            }
            res.send({
                message: "Todo deleted successfully!"
            });
        })
        .catch((er) => {

            return res.status(500).send({
                message: 'Could Not Delete A Todo'
            });
        });
}
// Update a task with the specified id in the request

exports.updateTodo = (req, res) => {
    const todo = {
        title: req.body.title,
        desc: req.body.desc,
        imageUrl: req.body.imageUrl,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        author: req.body.author,
        timeCreated: req.body.timeCreated,
        updateTime: req.body.updateTime,
        status: req.body.status,
    };
    
    Todo.findByIdAndUpdate(req.params.id, todo, {
        new: true,
        status: 'not completed'
    }).then((todo) => {
            if (!todo) {
                return res.status(404).send({
                    message: "No Todo Found"
                })
            }
            res.status(200).send(todo)
            console.log("Todo successfully updated" +todo)
        })
        .catch((er) => {
            return res.status(404).send({
                message: "error while updating the todo",
            });
        })
        console.log(todo);
    }