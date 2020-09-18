const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
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
    startDate: String ,
    endDate: String
  },
  published: {
    type: Boolean
  },
}, 
{timestamps: true},
{
  collection: 'todos'
})

module.exports = mongoose.model('todo', TodoSchema)