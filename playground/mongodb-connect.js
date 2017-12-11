// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server.');
  }

  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert ToDo', error);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Mike',
  //   age: 27,
  //   location: 'Baltimore'
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert User', error);
  //   }

  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  db.close();
});