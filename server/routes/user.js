const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const request = require('request');

const CryptoJS = require("crypto-js");

//to generate random no;
const randNo = require('random-number');
var gen = randNo.generator({
  min: -999999999999999, max: 999999999999999, integer: true
});

var pass = "./ashdkjashweoriuwoeuzmxcnmkasjduqoiwueasjdl";

function generateKey(p) {
  var salt = CryptoJS.lib.WordArray.random(128 / 8);
  return CryptoJS.PBKDF2(p, salt, { keySize: 512 / 32, iterations: 1000 });
}

//Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

//decrypt function
function decryptPass(pass, key) {
  let bytes = CryptoJS.AES.decrypt(pass, key);
  let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedPass;
}

//verifyCaptcha

function verifyCaptcha(captcha, ip) {
  const secretKey = '6LdkSV0UAAAAABIVlbavLK2pxVM0NYblFcARo-NY';

  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${ip}`;

  //Make request to verify url
  return new Promise(function (resolve, reject) {
    request(verifyUrl, (err, response, body) => {
      body = JSON.parse(body);
      console.log(body);
      if (body.success !== undefined && !body.success) {
        console.log('successs' + body.success);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function insertRecord(record) {
  return new Promise(function (resolve, reject) {
    connection((db) => {
      const dbName = db.db('doordrishtee');
      dbName.collection('users')
        .insertOne(record)
        .then(success => {
          console.log("dbInsert success");
          console.log(success);
          resolve(true);
        })
        .catch((err) => {
          console.log("dbInsert Fail");
          console.log(err);
          reject(false);
        });
    });
  });
}

//Connection
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/doordrishtee', (err, db) => {
    if (err) return console.log(err);

    closure(db);
  });
};

function searchField(key, value) {
  return new Promise(function (resolve, reject) {
    connection((db) => {
      const dbName = db.db('doordrishtee');
      let selector = { [key]: value };
      dbName.collection('users')
        .find(selector)
        .toArray()
        .then((fields) => {
          if (fields.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(false);
        });
    });
  });
}

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
  var randomTest = generateKey(pass);
  response.data = randomTest.toString();
  res.json(response);
});

router.post('/checkEmail', (req, res) => {
  response.data = true;
  let searchEmail = req.body.data.toString().toLowerCase();
  searchField('email', searchEmail)
    .then(success => {
      if (success) {
        response.data = true;
        response.status = 401;
      } else {
        response.data = false;
        response.status = 200;
      }
      res.json(response);
    }, error => {
      sendError(err, res);
    });
});

router.post('/checkAlias', (req, res) => {
  response.data = true;
  let searchAlias = req.body.data.toString().toLowerCase();
  searchField('alias', searchAlias)
    .then(success => {
      if (success) {
        response.data = true;
        response.status = 401;
      } else {
        response.data = false;
        response.status = 200;
      }
      res.json(response);
    }, error => {
      sendError(err, res);
    });
});

router.post('/signup', (req, res) => {
  let formData = req.body.data;

  formData['password'] = decryptPass(formData['password'], formData['checkPassword']);

  console.log(formData);

  if (formData['captcha']) {
    verifyCaptcha(formData['captcha'], req.connection.remoteAddress)
      .then(reponse => {
        if (response) {
          insertRecord(formData)
            .then(success => {
              response.status = 200;
              response.message = "Successfully signed up";
              response.data = null;
              res.json(response);
            }, error => {
              response.status = 500;
              response.message = "Unable to sign up";
              response.data = null;
              res.status(500);
              res.json(response);
            });
        } else {
          response.status = 401;
          response.message = "Captcha failed";
          response.data = null;
          res.json(response);
        }
      });
  } else {
    response.status = 401;
    response.message = "Invalid Captcha";
    response.data = null;
    res.json(response);
  }

});

module.exports = router;