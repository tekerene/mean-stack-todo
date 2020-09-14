const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  name: {
    type: String
  },
  desc: {
    type: String
  },
  datetime: {
    
  },
}, {
  collection: 'todos'
})

module.exports = mongoose.model('todo', todoSchema)