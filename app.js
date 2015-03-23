'use strict';

var
    express = require('express'),
    bodyParser = require('body-parser'),
    pmx = require('pmx').init(),
    helmet = require('helmet');

var app = express();
//config
app.use(helmet());
app.use(bodyParser.json());
app.use(pmx.expressErrorHandler()); //keymetrics error report

//serve static html
app.use('/', express.static('./frontend'));

//run
app.listen(3000);