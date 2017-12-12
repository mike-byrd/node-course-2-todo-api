const mongoose = require('mongoose');

// Set mongoose to use the build in Promise library, instead of callbacks by default.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };