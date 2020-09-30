const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')

let Todo = new Schema({
    title: String,
    desc: String,
    imageUrl: String,
    startDate: String,
    endDate: String,
    author: String,
    timeCreated: String,
    status: {
        type: String,
        default: "pending"
    },
}, {collection: 'todos'})

module.exports = mongoose.model('todo', Todo)
