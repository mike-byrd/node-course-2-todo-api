// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server.');
  }

  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate(
  //   { _id: new ObjectID('5a2eba7143c51e8e22076436') }, 
  //   { $set: {completed: false} }, 
  //   { returnOriginal: false }
  // ).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate(
    { _id: new ObjectID('5a2eaf4fae1e97267ee79f3a') },
    { $set: { name: 'Voldemort' }, $inc: { age: 10 } },
    { returnOriginal: false }
  ).then((result) => {
    console.log(result);
  });

  //db.close();
});