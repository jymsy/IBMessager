var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');
var apiRouterV1 = require('./api_router_v1');
require('./Models');
var app = express();

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

app.use('/', apiRouterV1);

app.use(function (err, req, res, next) {
    console.error('server 500 error:', err);
    return res.status(500).json({"error_message":err});
});

if (config.isHTTPS) {
    var https = require('https');
    var fs = require('fs');

    var options = {
        key: fs.readFileSync('cert/server-key.pem'),
        cert: fs.readFileSync('cert/server-cert.pem')
    };
    https.createServer(options, app).listen(config.port, config.host);
} else {
    var http = require("http");

    http.createServer(app).listen(config.port, config.host);
}
console.log("Server has started.");