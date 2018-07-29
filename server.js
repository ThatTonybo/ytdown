const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const server = require('http').createServer(app);

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes'));

// port
let port = 3000;
const cmdArgs = require('minimist')(process.argv.slice(2));
if (cmdArgs['p']) {
    port = parseInt(cmdArgs.p);
}


server.listen(port, () => console.log(`Listening on port ${port}`));