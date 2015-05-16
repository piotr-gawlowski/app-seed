'use strict';

var
    express = require('express'),
    bodyParser = require('body-parser'),
    pmx = require('pmx').init(),
    config = require('./config'),
    mongodb = require('mongodb').MongoClient,
    helmet = require('helmet');

var app = express();
//config
app.use(helmet());
app.use(bodyParser.json());
app.use(pmx.expressErrorHandler()); //keymetrics error report

//run
mongodb.connect(config.mongodb.database, function(err, mdb) {
    if(err){
        console.log(err);
        return; // R.I.P †
    }

    //add mongo client to every request
    app.use(function(req, res, next){
        req.mdb = mdb;
        next();
    });

    //serve frontend
    app.use('/', express.static('./frontend'));

    //apply routes
    require('./config/routes.js')(app);


    //"It's alive"
    app.listen(config.port, function(){
        console.log('On your commands on port *:'+config.port);
    });
});