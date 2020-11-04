const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// settings
app.set('port', process.env.PORT || 5000);

// middlewares 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(express.json());

// routes
app.use('/customapi/search', require('./routes/search.router'));

module.exports = app;