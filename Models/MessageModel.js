/**
 * Created by wanglongyan on 15/6/10.
 */


var mongoose = require('mongoose');

var msgSchema = mongoose.Schema({
    from:       String,
    to:         String,
    timestamp:  { type: Date, default: Date.now },
    chattype:   String,
    content:   {type: String, default: ""},
    content_type: {type: String, default: "str"},
    url:        {type: String, default: ""}
});

msgSchema.methods.fun = function (callback) {

};

msgSchema.methods.send = function (callback) {
    this.save(function(error) {
        callback(error);
    });
};


exports.model = mongoose.model('messages', msgSchema);
exports.send = function(fromUser, toUser, chattype, content, url, callback) {

    var sendMsg = new exports.model({
        from:fromUser,
        to:toUser,
        timestamp:new Date(),
        chattype:chattype,
        content:content,
        url:url
    });
    sendMsg.send(function (error) {
        callback(error);
    });
};

exports.addMessage = function(message, callback) {
    var sendMsg = new exports.model(message);
    sendMsg.send(function (error) {
        callback(error);
    });
};

exports.getLatestMessages = function (fromId, toId, early, late, chatType, callback) {
    if (chatType == "group") {
        var con1 = {to: toId};
    } else {
        var con1 = {$or: [{to : toId, from : fromId}, {to : fromId, from : toId}]};
    }
    var con2 = {timestamp: {$lt: late, $gt: early}};
    var conditions = {$and:[con1, con2]};
    exports.model.find(conditions).sort({'timestamp':-1}).limit(20).exec(function(err,msgs){
        if (msgs.length > 0) {
            msgs.reverse();
        }
        callback(err, msgs);
    });
};

exports.checkNewMessage = function(myID, timeStamp, callback) {
    var date = new Date();
    var con1 = {$or: [{to : myID}, {from : myID}]};
    var con2 = {timestamp: {$lte: date, $gt: new Date(timeStamp)}};
    var conditions = {$and:[con1, con2]};
    exports.model.find(conditions).exec(function(err,results){
        if (err) {
            callback(undefined);
        } else {
            var realData = [];
            for (var i in results) {
                var doc = results[i];
                if (doc.to == myID) {
                    realData.push({id:doc.from, type:doc.chattype});
                } else if (doc.from == myID) {
                    realData.push({id:doc.to, type:doc.chattype});
                }
            }
            callback({data: realData, time: date});
        }
    });
};

exports.getGroupMessages = function (groupId, early, late, callback) {
    var con1 = {$or: [{to : toId, from : fromId}, {to : fromId, from : toId}]};
    var con2 = {timestamp: {$lte: new Date(late), $gt: new Date(early)}};
    var conditions = {$and:[con1, con2]};
    exports.model.find(conditions).sort({'timestamp':-1}).limit(20).exec(function(err,msgs){
        if (msgs.length >= 0) {
            msgs.reverse();
            callback(msgs);
        } else {
            callback(undefined);
        }
    });
};

exports.clear = function (callback) {
    exports.model.remove({}, function (err){
        if(err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};