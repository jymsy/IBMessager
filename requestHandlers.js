/**
 * Created by svs_mini on 13-12-11.
 */

//import some models
var userModel = require('./Models/UserModel.js');
var messageModel = require('./Models/MessageModel.js');
var groupModel = require('./Models/GroupModel.js');

//inner function
function handlePostRequestAsync(request, callback)
{

    var postData = "";
    request.setEncoding("utf8");
    request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
    });

    request.addListener("end", function() {
        var exec = require("child_process").exec;
        exec("", function (error, stdout, stderr) {
            callback(postData, error, stdout, stderr);
        });
    });
}

function handlePostRequestSync(request, callback)
{
    var postData = "";
    request.setEncoding("utf8");
    request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
    });

    request.addListener("end", function() {
        callback(postData);
    });
}

function sendResponceWithBody(response, body)
{
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(body);
    response.end();
}

function getErrorWithMessage(msg)
{
    return {error:msg};
}

//export interface
function start(response)
{
    var body = 'Welcome';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

//用户登陆
function login(response, request)
{
    handlePostRequestAsync(request, function(postData, error, stdout, stderr) {
        var json = JSON.parse(postData);

        var name = json.name;
        var password = json.password;

        userModel.checkLogin(name, password, function(found) {
            var jsonStr;
            if (found) {
                jsonStr = found;
            } else {
                jsonStr = getErrorWithMessage('error username or password');
            }
            sendResponceWithBody(response, JSON.stringify(jsonStr));
        });
    });
}

function sendMsg(response, request)
{
    handlePostRequestAsync(request, function(postData, error, stdout, stderr) {
        var msg = JSON.parse(postData);
        msg.url = !msg.url ? "" : msg.url;
        if (msg) {
            messageModel.send(msg.from, msg.to, msg.chattype, msg.content, msg.url, function(error) {
                var jsonStr;
                if (error) {
                    jsonStr = JSON.stringify({error : 1});
                } else {
                    jsonStr = JSON.stringify({error : 0});
                }

                sendResponceWithBody(response, jsonStr);
            });
        } else {
            sendResponceWithBody(response, JSON.stringify({error : 1}));
        }
    });
}

function getLatestMessages(response, request)
{
    handlePostRequestAsync(request, function(postData, error, stdout, stderr) {
        var json = JSON.parse(postData);

        if (!json.late) {
            json.late = (new Date()).toString();
        }
        if (!json.early) {
            json.early = (new Date('2015-01-01 01:01:01')).toString();
        }

        messageModel.getLatestMessages(json.from , json.to, json.early, json.late, json.chattype, function(results) {
            var jsonStr;
            if (results) {
                jsonStr = results;
            } else {
                jsonStr = getErrorWithMessage('no record');
            }
            jsonStr = JSON.stringify(jsonStr);
            sendResponceWithBody(response, jsonStr);
        });
    });
}

function getUserBriefInfo(response, request)
{
    handlePostRequestAsync(request, function(postData, error, stdout, stderr) {
        var json = JSON.parse(postData);
        var jsonStr;

        userModel.getUserBriefInfo(json.userIDs, function(results) {
            if (results) {
                jsonStr = {data:results};
            } else {
                jsonStr = getErrorWithMessage('get brief info failed');
            }
            jsonStr = JSON.stringify(jsonStr);
            sendResponceWithBody(response, jsonStr);
        });
    });
}

function addFriend(response, request) {
    handlePostRequestAsync(request, function(postData, error, stdout, stderr) {
        var json = JSON.parse(postData);
        var jsonStr;
        if (json.targetID == json.myID) {
            jsonStr = getErrorWithMessage("cannot add self as a friend");
            jsonStr = JSON.stringify(jsonStr);
            sendResponceWithBody(response, jsonStr);
        } else {
            userModel.addFriend(json.targetID, json.myID, function(results) {
                if (results) {
                    jsonStr = results;
                } else {
                    jsonStr = getErrorWithMessage('add friend failed');
                }
                jsonStr = JSON.stringify(jsonStr);
                sendResponceWithBody(response, jsonStr);
            });
        }
    });
}

function getMyFriendsList(response, request) {
    handlePostRequestAsync(request, function(postData, error, stdout, stderr) {
        var json = JSON.parse(postData);

        userModel.getFriendList(json.targetID, function(results) {
            var jsonStr;
            if (results) {
                jsonStr = {data:results};
            } else {
                jsonStr = getErrorWithMessage('get friend list failed');
            }
            jsonStr = JSON.stringify(jsonStr);
            sendResponceWithBody(response, jsonStr);
        });
    });
}

function searchFriend(response, request) {
    handlePostRequestAsync(request, function(postData, error, stdout, stderr) {
        var json = JSON.parse(postData);

        userModel.searchFriend(json.name, function(results) {
            var jsonStr;
            if (results) {
                jsonStr = {data:results};
            } else {
                jsonStr = getErrorWithMessage('search friend failed');
            }
            jsonStr = JSON.stringify(jsonStr);
            sendResponceWithBody(response, jsonStr);
        });
    });
}

function checkNewMessage(response, request) {
    handlePostRequestAsync(request, function(postData, error, stdout, stderr) {
        var json = JSON.parse(postData);
        json.timestamp = !json.timestamp ? new Date().getTime() - 3600*1000 : json.timestamp;
        messageModel.checkNewMessage(json.myID, json.timestamp, function(results) {
            var jsonStr;
            if (results) {
                jsonStr = results;
            } else {
                jsonStr = getErrorWithMessage('check new msg failed');
            }
            jsonStr = JSON.stringify(jsonStr);
            sendResponceWithBody(response, jsonStr);
        });
    });
}

function getUserGroups(response, request) {
    handlePostRequestAsync(request, function(postData, error, stdout, stderr) {
        var json = JSON.parse(postData);

        groupModel.getUserGroups(json.uId, function(results){
            var jsonStr;
            if (results) {
                jsonStr = {data:results};
            } else {
                jsonStr = getErrorWithMessage("get user's groups list failed");
            }
            jsonStr = JSON.stringify(jsonStr);
            sendResponceWithBody(response, jsonStr);
        });
    });
}

function addUser(response, request) {
    handlePostRequestAsync(request, function(postData, error, stdout, stderr) {
        var json = JSON.parse(postData);

        userModel.addUser(json, function(results){
            var jsonStr;
            if (results) {
                jsonStr = {data:results};
            } else {
                jsonStr = getErrorWithMessage("get user's groups list failed");
            }
            jsonStr = JSON.stringify(jsonStr);
            sendResponceWithBody(response, jsonStr);
        });
    });
}

exports.start = start;
exports.login = login;
exports.sendMsg = sendMsg;
exports.getLatestMessages = getLatestMessages;
exports.checkNewMessage = checkNewMessage;
exports.addFriend = addFriend;
exports.getMyFriendsList = getMyFriendsList;
exports.searchFriend = searchFriend;
exports.getUserBriefInfo = getUserBriefInfo;
exports.getUserGroups = getUserGroups;