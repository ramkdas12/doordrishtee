const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const http = require ('http');
const app = express();

//to generate UUID
const uuidv4 = require('uuid/v4');

//API for interacting with mongoDB
const api = require('./server/routes/api');

const user = require('./server/routes/user');

//parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
 
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

//user login signUp functionality
app.use('/user', user);

//Send all request to the angular app
app.get('*', (req, res) => {
  var requestId = req.header('requestName');
  var ip;
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',').pop() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress;
         
  console.log(ip);
  } else if (req.connection.remoteAddress) {
    ip = req.connection.remoteAddress; 
    console.log(ip);
  }
  
  console.log(requestId);
  if(!requestId) {
    var uuid = uuidv4();
    console.log(uuid);
    res.setHeader('requestId', uuid);
  }
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//set port
const port = process.env.PORT || '3000';
app.set('port', port);

//server
const server = http.createServer(app);

console.log("Hellow Rambo");

server.listen(port, () => console.log('Running on localhost: ${port}'));