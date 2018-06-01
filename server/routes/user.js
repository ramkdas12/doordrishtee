const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//to generate random no;
const randNo = require('random-number');
var gen = randNo.generator({
  min:  -999999999999999, max:  999999999999999, integer: true
});

//Response handling
let response = {
  status : 200,
  data : [],
  message : null 
};

//Connection
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/doordrishtee', (err, db) => {
    if (err) return console.log(err);

    closure(db);
  });
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

router.post('/connectionTest', (req, res) => {
  var randomTest = gen();
  response.data = randomTest.toString();
  res.json(response);
});

router.post('/signup', (req, res) => {
  console.log(req.body);
     
  res.status(200).json(response)
});

module.exports = router;