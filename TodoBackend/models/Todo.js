const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
  title: {
    type: String
  },
  desc: {
    type: String
  },
  imageUrl: {
    type: String
  },
  date: {
   startDate: String,
   endDate: String
},
  published: {
    type: Boolean
  },
  status:{
      type: String,
      default: "pending"
  }
},
  
  {
    collection: 'todos'
  })

module.exports = mongoose.model('todo', Todo)