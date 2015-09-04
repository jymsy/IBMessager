var message = require('../../Models/MessageModel');


exports.sendMsg = function(req, res, next) {
    var from = req.body.from;
    var to = req.body.to;
    var chatType = req.body.chattype;
    var content = req.body.content;
    var url = !req.body.url ? "" : req.body.url;

    if (content && from && to && chatType) {
        message.send(from, to, chatType, content, url, function(error) {
            if (error) {
                next(error.message);
            } else {
                res.json({error:0});
            }
        });
    } else {
        res.status(400).json({error_message:"Invalid parameter"});
    }
};

exports.getLatestMessages = function(req, res, next) {
    var from = req.body.from,
        to = req.body.to,
        early = req.body.early,
        late = req.body.late,
        chatType = req.body.chattype;

    if (!late) {
        late = new Date();
    } else {
        late = new Date(late);
    }
    if (!early) {
        early = new Date('2015-01-01 01:01:01');
    } else {
        early = new Date(early);
    }

    if (from && to && chatType) {
        message.getLatestMessages(from , to, early, late, chatType, function(error, results) {
            if (error) {
                next(error.message);
            } else {
                res.json(results);
            }
        });
    } else {
        res.status(400).json({error_message:"Invalid parameter"});
    }
};

exports.checkNewMessage = function(req, res, next) {
    var myID = req.body.myID, timestamp = req.body.timestamp;
    timestamp = !timestamp ? new Date().getTime() - 3600*1000 : timestamp;

    if (myID) {
        message.checkNewMessage(myID, timestamp, function(results) {
            if (results) {
                res.json(results);
            } else {
                next(error.message);
            }
        });
    } else {
        res.status(400).json({error_message:"Invalid parameter"});
    }
};