const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
  name: {
    type: String
  },
  desc: {
    type: String
  },
  imageUrl: {
    type: String
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