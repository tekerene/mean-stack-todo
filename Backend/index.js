let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./util/db');


const app = express();
const todoRoute = require('./routes/todo')
// Connecting with mongo db

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {useNewUrlParser: true}).then(() => {
    console.log('Database sucessfully connected')
}, error => {
    console.log('Database could not connected: ' + error)
})



app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
/**
 * @API cors  
 */
app.use(cors());
app.options('*', cors());
app.use(express.static(path.join(__dirname, 'dist/mean-stack-todo')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-todo')));
app.use('/api', todoRoute)



/**
   * @Make "public" Folder Publicly Available  
*/ 

app.use('/public', express.static('public'));

// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

/**
   * @Create port  
*/
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => { // next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    console.error(err.message); // Log error message in our server's console
    if (! err.statusCode) 
        err.statusCode = 500;
     // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
