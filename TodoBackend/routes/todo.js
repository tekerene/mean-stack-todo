const express = require('express');
const router = express.Router();
const endpoints = require('../config/endpoints');
// require multer and path for file upload
const multer = require('multer');
const path = require('path');
// Require the controllers
const todo_controller = require('../controllers/todoController.js');
// a simple test url to check that all of our files are communicating correctly.
router.get(endpoints.todos, todo_controller.getTodos);
router.get(endpoints.todo, todo_controller.getTodo);
router.post(endpoints.addTodo, todo_controller.addTodos);
router.patch(endpoints.updateTodo, todo_controller.updateTodo);
router.delete(endpoints.deleteTodo, todo_controller.deleteTodo);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/svg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
router.post(endpoints.imageUpload, upload.single('image'), (req, res) => {
    let imgPath = `/uploads/${req.file.filename}`;
    try {
        return res.status(201).json({
            message: 'File uploded successfully',
            imgPath: imgPath
        })
    } catch (error) {
        console.error(error);
    }
})
module.exports = router;