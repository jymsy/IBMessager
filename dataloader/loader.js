var data = require("./data");
var userModel = require('../Models/UserModel.js');
var messageModel = require("../Models/MessageModel.js");
var groupModel = require("../Models/GroupModel.js");
var crypto = require('crypto');
var async=require('async');

var userIds = {}, groupIds={};

function md5 (str) {
    return crypto.createHash("md5").update(str).digest("hex");
}

async.series({
    clearUser: function (done){
        userModel.clear(done);
    },
    clearMessage: function (done){
        messageModel.clear(done);
    },
    clearGroup: function (done) {
        groupModel.clear(done);
    },
    initUser: function (done) {
        async.each(data.users, function(user, callback) {
            user['password'] = md5(user['password']);
            userModel.addUser(user, function(err, user){
                if (err)
                    callback(err);
                else {
                    userIds[user['name']] = user.id;
                    callback();
                }
            });
        }, function(err){
            if (err)
                done(err);
            else
                done(null, 'initUser');
        });

    },
    initGroup: function (done) {
        async.each(data.groups, function(group, callback) {
            for (var i in group['member']) {
                group['member'][i].uid = userIds[group['member'][i].uid];
            }
            groupModel.addGroup(group, function(err, group){
                if (err)
                    callback(err);
                else {
                    groupIds[group['name']] = group.id;
                    callback();
                }
            });
        }, function(err){
            if (err)
                done(err);
            else
                done(null, 'initGroup');
        });
    },
    initMessage: function (done) {
        async.each(data.messages, function(message, callback) {
            message['from'] = userIds[message['from']];
            message['to'] = userIds[message['to']] ? userIds[message['to']] : groupIds[message['to']];
            messageModel.addMessage(message, function (err){
                if (err)
                    callback(err);
                else
                    callback();
            });
        }, function(err){
            if (err)
                done(err);
            else
                done(null, 'initMessage');
        });
    }
}, function (error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log('load data complete.');
    }
    process.exit(0);
});
