global.config = require('../config');

//DB init
var mongoose = require('mongoose');
//mongoose.connect(config.mongoose.url+config.mongoose.db);
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function (error){
    console.log('Mongoose connection error: ' + error);
    process.exit(1);
});
db.once('open', function () {
    console.log('db open');
     require("./loader");
});

process.on('SIGINT', function () {
    db.close(function (){
        console.log('Mongoose disconnected');
        process.exit(0);
    });
});