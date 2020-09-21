//const todoControllers = require("../controller/todoController");
// module.exports = app => {
     const todos = require("../controller/todoController");
     const multer = require('multer')
     Gallery = require('../models/TodoSchema')
     const path = require('path')
     const endpoints = require('./endpoints');
     
    var router = require("express").Router();

    router.get('/images/:name', (req,res)=>{
      console.log('***********************');
      //res.send('sfchejf')
      let directory = path.join(__dirname+ '../../');
      console.log(directory)
    res.sendFile(directory+"public/images/"+req.params.name)
   })
   
    // Create a new Todo
    router.post(endpoints.createTodo, todos.create);
  
    // Create a new Todo images
    //router.post("/images", todos.create);
  
    // Retrieve all todos
    router.get(endpoints.getTodos, todos.findAll);

  // Retrieve all images
  //router.get("/images", todos.findAll);

    // Retrieve all published todos
    router.get(endpoints.publishedTodo, todos.findAllPublished);
  
    // Retrieve a single Todo with id
    router.get(endpoints.getById, todos.findOne);
  
    // Update a Todo with id
    router.put(endpoints.editTodo, todos.update);
  
    // Delete a Todo with id
    router.delete(endpoints.deleteTodo, todos.delete);
  
    // Create a new Todo
    router.delete(endpoints.deleteAll, todos.deleteAll);
  
    // app.use('/api/', router);

    /**
     * image upload router
     */

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, `public/images`);
      },
      filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname));
      }
  });
  const fileFilter = (req, file, cb) => {
      if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
          cb(null, true);
      } else {
          cb(null, false);
      }
  }
  const upload = multer({ storage: storage, fileFilter: fileFilter });
  router.post('/images', upload.single('image'), (req, res) => {
       
       let  imgPath = `public/images/${req.file.filename}`;
         console.log(req.file.filename);
      try {
          return res.status(201).json({
              message: 'File uploded successfully',
              imgPath: imgPath
          });
      } catch (error) {
          console.error(error);
      }
  });

  module.exports = router;