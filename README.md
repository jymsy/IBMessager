### 运行dataloader
```
$ node dataloader/init
```

### 运行Server
```
$ node app
```

### api
都是POST请求，请求成功返回200，否则失败。
请求失败返回：
{"error_message":"xxxxxx"}

* /login

<pre>
参数   {"name":"John","password":"xxx"}
返回值    {"name":"John","id":"55e6fb944d28047a33af4a34","session":"55e6fb944d28047a33af4a34"}
</pre>

* /sendMsg  

<pre>
{"from":"xxx","to":"xxx", "chattype" : "xxx", "content": ""}
</pre>

/getLatestMessages  {"from":"xxx","to":"xxx", "chattype" : "xxx", "early": "xx", "late":"xx"}

/addFriend   {"targetID":"xxx","myID":"xx"}

/getMyFriendsList   {"targetID":"xxx"}

/searchFriend   {"name":"xxx"}

/checkNewMessage    {"myID":"xx", "timestamp":"xxx"}

/getUserBriefInfo   {"userIDs":["xx","xx"]}

/getUserGroups   {"uId":"xx"}
