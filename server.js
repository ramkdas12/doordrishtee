const express = require ('express');
const bodyParser = require ('body-parser');
const path = require ('path');
const http = require ('http');
const app = express();

//API for interacting with mongoDB
const api = require('./server/routes/api');

//parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
 
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

//Send all request to the angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//set port
const port = process.env.PORT || '3000';
app.set('port', port);

//server
const server = http.createServer(app);

console.log("Hellow Rambo");

server.listen(port, () => console.log('Running on localhost: ${port}'));