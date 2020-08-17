const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors')
const app = express();
app.use(cors({credentials: true, origin: true}))

// Middlewares
// -----------

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
require('./routes')(app);
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello World!',
    })
});

// Server.
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
