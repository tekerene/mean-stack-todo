const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    title: String,
    desc: String,
    imageUrl: String,
    date: {
        startDate: String,
        endDate: String
    },
    author: String,
    status: {
        type: Boolean,
        default: "pending"
    }
}, {collection: 'todos'})

module.exports = mongoose.model('todo', Todo)
