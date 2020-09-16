let express = require('express'),
  // database = require('./config/database'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors')
const db = require("./models/index");
// Connect mongoDB


//  const todoAPI = require('./routes/todo')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
/**
 * @API   
 */
// app.use('/api', todoAPI)

var corsOptions = {
  origin: "http://localhost:4000"
};

/**
 * cors  
 */

 app.use(cors(corsOptions)); 

/**
 * @Create port  
 */

require("./routes/todo")(app);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to Localhost' + port)
})

/**
 *@test 
 */ 

app.use((req, res, next) => {
  // res.send('welcome to our todo app')
//   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});