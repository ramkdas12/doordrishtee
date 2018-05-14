const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Connection
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/doordrishtee', (err, db) => {
    if (err) return console.log(err);

    closure(db);
  });
};

//Error Handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

//Response handling
let response = {
  status : 200,
  data : [],
  message : null 
};

//Get users
router.get('/users', (req, res) => {
  connection((db) => {
    const dbName = db.db('doordrishtee');
    dbName.collection('users')
      .find()
      .toArray()
      .then((users) => {
        console.log(users);
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

//export
module.exports = router;
