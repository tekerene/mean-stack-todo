const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todoApp', { useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true}, (er)=>{
  if(!er){
    console.log('Successfully Connected To Database')
  }else {
    console.log(err +'Failled To Connect TO Database')
  }
})
module.exports = mongoose;