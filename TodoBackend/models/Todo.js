const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var date = new Date();
date.toString();
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
        type: String,
        default: "pending"
    },
}, {collection: 'todos'})

module.exports = mongoose.model('todo', Todo)
