var group = require('../../Models/GroupModel');


exports.getUserGroups = function(req, res, next) {
    var uId = req.body.uId;

    if (uId) {
        group.getUserGroups(uId, function(error, results){
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

