const express = require('express');
const path = require('path');
const mongoose = require('./database/mongodb-connect');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
  
const app = express();
const todoRoute = require('./routes/todo')
const userRoute = require('./routes/auth')
app.use(express.json());
app.use(express.urlencoded({extended: false}));
/**
 * @API cors  
 */
app.use(cors());
app.options('*', cors());
app.use('/', todoRoute);
app.use('/user', userRoute);



/**
   * @Make "public" Folder Publicly Available  
*/ 

app.use('/uploads', express.static('uploads'));

// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

/**
   * @Create port  
*/
const port = process.env.PORT || 3009;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => { // next(createError(404));
});


// error handler
app.use(function (err, req, res) {
    console.error(err.message); // Log error message in our server's console
    if (! err.statusCode) 
        err.statusCode = 500;
     // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message);
    console.log(err) // All HTTP requests must have a response, so let's send back an error with its status code and message
});
