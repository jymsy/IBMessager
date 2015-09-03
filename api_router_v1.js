var groupController   = require('./api/v1/group');
var userController    = require('./api/v1/user');
var messageController = require('./api/v1/message');

var router            =  require('express').Router();


router.post('/login', userController.login);
router.post('/getMyFriendsList', userController.getMyFriendsList);
router.post('/searchFriend', userController.searchFriend);
router.post('/getUserBriefInfo', userController.getUserBriefInfo);
router.post('/addFriend', userController.addFriend);

router.post('/sendMsg', messageController.sendMsg);
router.post('/getLatestMessages', messageController.getLatestMessages);
router.post('/checkNewMessage', messageController.checkNewMessage);

router.post('/getUserGroups', groupController.getUserGroups);

module.exports = router;