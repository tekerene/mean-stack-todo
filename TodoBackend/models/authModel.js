const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Auth = new Schema({
    fullname: String,
    username: String,
    email: String,
    password: String,
    confirmPassword: String,
}, {collection: 'users'})

module.exports = mongoose.model('auth', Auth)
