var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
    name: String,
    member: Array,
    description: String,
    createTime:  { type: Date, default: Date.now }
});


exports.groupModel = mongoose.model('groups', groupSchema);

exports.getGroupBriefInfo = function(groupID, callback) {

};

exports.getUserGroups = function (uId, callback) {
    var condition = {
            member:{
                $elemMatch:{uid:uId}
            }
        };
    exports.groupModel.find(condition,{name:1,description:1}).sort({name:-1}).exec(callback);
};

exports.addGroup = function (group, callback) {
    new exports.groupModel(group).save(callback)
};

exports.clear = function (callback) {
    exports.groupModel.remove({}, function(err){
        if(err) {
            callback(err);
        } else {
            callback(null);
        }
    });
};

