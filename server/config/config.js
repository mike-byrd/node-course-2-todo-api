/* Default the environment to 'development'. 
  * It will be set to 'production' when running 
  * from heroku and 'test' when running the test 
  * script from package.json */
  var env = process.env.NODE_ENV || 'development';
  
  if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
  } else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
  }