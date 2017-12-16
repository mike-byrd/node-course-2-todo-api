const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  { 
    _id: userOneId, 
    email: 'mike@example.com', 
    password: 'userOnePass' ,
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
  },
  { 
    _id: userTwoId, 
    email: 'tim@example.com', 
    password: 'userTwoPass'
  }
];

const todos = [
  { _id: new ObjectID(), text: 'test todo 1' },
  { _id: new ObjectID(), text: 'test todo 2', completed: true, completedAt: 123 }
];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done()); // clears the todos collection.
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    // Waits for both promises to finish before calling then.
    // returning it allows us to call then using the returned promise on the next line.
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};