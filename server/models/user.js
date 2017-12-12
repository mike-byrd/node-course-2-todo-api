const mongoose = require('mongoose');

//Defines a data model.
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
 }
);

module.exports = {User};