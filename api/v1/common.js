var user = require('../../Models/UserModel');
var group = require('../../Models/GroupModel');
var async=require('async');

exports.getBriefInfo = function(req, res, next) {
    var ids = req.body.ids;

    if (ids && ids instanceof Array) {
        async.parallel({
            usersInfo: function(done){
                user.getUserBriefInfo(ids, function(error, results) {
                    if (error) {
                        done(error, null);
                    } else {
                        done(null, results);
                    }
                });
            },
            groupsInfo: function(done){
                group.getGroupBriefInfo(ids, function(error, results) {
                    if (error) {
                        done(error, null);
                    } else {
                        done(null, results);
                    }
                });
            }
        }, function (error, result) {
            if (error) {
                next(error.message);
            } else {
                res.json(result.usersInfo.concat(result.groupsInfo));
            }
        });
    } else {
        res.status(400).json({error_message:"Invalid parameter"});
    }
};
