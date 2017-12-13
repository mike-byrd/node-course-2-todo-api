const {ObjectID} = require('mongodb');

const {mongoose} =require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((results) => {
//   console.log(results);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove(id)

// Todo.findByIdAndRemove('5a309eb24386ff8cc81ee75c').then((todo) => {
//   console.log(todo);
// });

// Todo.findOneAndRemove({_id: '5a309eb24386ff8cc81ee75c'}).then((todo) => {
//   console.log(todo);
// });