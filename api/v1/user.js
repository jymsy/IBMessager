var user = require('../../Models/UserModel');


exports.login = function(req, res) {
    var name = req.body.name;
    var password = req.body.password;

    if (name && password) {
        user.checkLogin(name, password, function(found) {
            if (found) {
                res.json(found);
            } else {
                res.status(401).json({error_message:"invalid username or password"});
            }
        });
    } else {
        res.status(401).json({error_message:"invalid username or password"});
    }
};

exports.getMyFriendsList = function(req, res, next) {
    var uid = req.body.targetID;

    if (uid) {
        user.getFriendList(uid, function(error, results) {
            if (error) {
                next(error.message);
            } else {
                res.json({data:results});
            }
        });
    } else {
        res.status(400).json({error_message:"Invalid parameter"});
    }
};

exports.searchFriend = function(req, res, next) {
    var name = req.body.name;

    if (name) {
        user.searchFriend(name, function(error, results) {
            if (error) {
                next(error.message);
            } else {
                res.json({data:results});
            }
        });
    } else {
        res.status(400).json({error_message:"Invalid parameter"});
    }
};

exports.getUserBriefInfo = function(req, res, next) {
    var ids = req.body.userIDs;

    if (ids && ids instanceof Array) {
        user.getUserBriefInfo(ids, function(error, results) {
            if (error) {
                next(error.message);
            } else {
                res.json({data:results});
            }
        });

    } else {
        res.status(400).json({error_message:"Invalid parameter"});
    }
};

exports.addFriend = function(req, res, next) {
    var targetID = req.body.targetID;
    var myID = req.body.myID;

    if (!targetID || !myID) {
        res.status(400).json({error_message:"Invalid parameter"});
    } else if (targetID == myID) {
        res.status(400).json({error_message:"cannot add self as a friend"});
    } else {
        user.addFriend(targetID, myID, function(results) {
            if (results) {
                res.json(results);
            } else {
                next(error.message);
            }
        });
    }
};
