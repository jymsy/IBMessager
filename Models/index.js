var mongoose = require('mongoose');
var config   = require('../config');

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
//require('./UserModel');
//require('./MessageModel');
//require('./GroupModel');
//
//exports.User         = mongoose.model('UserModel');
//exports.Group = mongoose.model('GroupModel');
//exports.Message      = mongoose.model('MessageModel');