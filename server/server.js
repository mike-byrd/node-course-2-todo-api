require("./config/config");

const _ = require("lodash");
const { ObjectID } = require("mongodb");

var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose"); // eslint-disable-line no-unused-vars
var { Todo } = require("./models/todo");
var { User } = require("./models/user");
var { authenticate } = require("./middleware/authenticate");

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

// GET /todos/12345
app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  // validate the id
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  // remove todo by id
  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  var body = _.pick(req.body, ["text", "completed"]);
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// POST /users
app.post("/users", (req, res) => {
  var user = new User(_.pick(req.body, ["email", "password"]));

  user.save().then(() => {
    return user.generateAuthToken();
  }).then(token => {
    // Prefixing a header with 'x-' means you're creating a custom header.
    res.header("x-auth", token).send(user);
  })
  .catch(err => {
    res.status(400).send(err);
  });
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login (email, password)
app.post("/users/login", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);

  User.findByCredentials(body.email, body.password).then(user => {
    //return this statement in case an error occurs so the catch block catches it.
    return user.generateAuthToken().then(token => {
      res.header("x-auth", token).send(user);
    });
  }).catch(err => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
