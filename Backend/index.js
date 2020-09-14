let express = require('express'),
  database = require('./database'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected")
  },
  error => {
    console.log("Database could't be connected to: " + error)
  }
)

 const todoAPI = require('./routes/todo.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


/**
 * @API   
 */
app.use('/api', todoAPI)

/**
 * @Create port  
 */
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to Localhost' + port)
})
/**
 *@test 
 */ 
app.get('/', req, res {})
app.use((req, res, next) => {
  res.send('welcome to our todo app')
//   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});