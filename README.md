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

如果请求的参数是json形式的, 客户端请求接口时必须指名请求头类型 application/json

* /login

<pre>
参数   {"name":"John","password":"xxx"}
返回值    {"name":"John","id":"55e6fb944d28047a33af4a34","session":"55e6fb944d28047a33af4a34"}
</pre>

* /sendMsg  

<pre>
参数  {"from":"xxx","to":"xxx", "chattype" : "xxx", "content": "xxxx"}
chattype: one 一对一, group: 群组

返回值  {"error":0}
</pre>

* /getLatestMessages

 最多返回20条

<pre>
参数  {"from":"xxx","to":"xxx", "chattype" : "xxx", "early": "xx", "late":"xx"}
返回值 [{"_id":"55e6641b702956781821d10c","from":"55e6641a702956781821d104","to":"55e6641a702956781821d105","chattype":"one","__v":0,"url":"",
        "content_type":"str","content":"hello","timestamp":"2015-09-02T02:51:07.149Z"}]
</pre>

* /addFriend

<pre>
参数  {"targetID":"xxx","myID":"xx"}
返回值 {"__v":0,"fromID":"55e908421e9c24321c67f363","toID":"55e908421e9c24321c67f362","status":"waiting","_id":"55e9112f705f03411ccb1e46"}
</pre>

* /getMyFriendsList

<pre>
参数  {"targetID":"xxx"}
返回值 {"data":[{"name":"John","_id":"55e9112f705f03411ccb1e46","fromID":"55e908421e9c24321c67f363","toID":"55e908421e9c24321c67f362","status":"waiting","__v":0}]}
</pre>

* /searchFriend

<pre>
参数  {"name":"xxx"}
返回值 {"data":[{"_id":"55e908421e9c24321c67f364","name":"Ray","__v":0,"createTime":"2015-09-04T02:56:02.074Z"}]}
</pre>

* /checkNewMessage

<pre>
参数  {"myID":"xx", "timestamp":"xxx"}
返回值 
{"data":[{"id":"55e6fb944d28047a33af4a35","type":"one"},
            {"id":"55e6fb944d28047a33af4a3a","type":"group"}],
 "time":"2015-09-04T03:48:54.171Z"}
</pre>

* /getUserBriefInfo

<pre>
参数 {"userIDs":["xx","xx"]}
返回值 {"data":[
            {"_id":"55e908421e9c24321c67f362","name":"John","__v":0,"createTime":"2015-09-04T02:56:02.068Z"},
            {"_id":"55e908421e9c24321c67f364","name":"Ray","__v":0,"createTime":"2015-09-04T02:56:02.074Z"}
            ]}
</pre>

* /getUserGroups

<pre>
参数  {"uId":"xx"}
返回值 {"data":[
                {"_id":"55e908421e9c24321c67f369","name":"GroupC","description":"Group C"},
                {"_id":"55e908421e9c24321c67f368","name":"GroupB","description":"Group B"}
                ]}
</pre>

* /getBriefInfo

<pre>
参数 {"ids":["xx","xx"]}
返回值 
[{"_id":"55e6fb944d28047a33af4a34","name":"John","__v":0,"createTime":"2015-09-02T13:37:24.356Z"},
{"_id":"55e6fb944d28047a33af4a35","name":"Evan","__v":0,"createTime":"2015-09-02T13:37:24.362Z"},
{"_id":"55e6fb944d28047a33af4a39","name":"GroupA","description":"Group A","__v":0,"createTime":"2015-09-02T13:37:24.379Z","member":[]}]
</pre>

* /getBriefInfo

<pre>
参数 {"ids":["xx","xx"]}
返回值 
[{"_id":"55e6fb944d28047a33af4a34","name":"John","__v":0,"createTime":"2015-09-02T13:37:24.356Z"},
{"_id":"55e6fb944d28047a33af4a35","name":"Evan","__v":0,"createTime":"2015-09-02T13:37:24.362Z"},
{"_id":"55e6fb944d28047a33af4a39","name":"GroupA","description":"Group A","__v":0,"createTime":"2015-09-02T13:37:24.379Z","member":[]}]
</pre>
