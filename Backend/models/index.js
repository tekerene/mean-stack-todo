
const dbConfig = require("../config/database");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.todo = require("./todo.model.js")(mongoose);

module.exports = db;