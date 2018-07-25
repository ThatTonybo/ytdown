const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const server = require('http').createServer(app);

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes'));

server.listen(3000, () => console.log(`Listening on port 3000`));