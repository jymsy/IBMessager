module.exports = {
    users: [
        {name: "John",password:"888", nickname:""},
        {name: "Evan",password:"888", nickname:""},
        {name: "Ray",password:"888", nickname:""},
        {name: "Lawrence",password:"888", nickname:""},
        {name: "Baidi",password:"888", nickname:""}
    ],
    groups: [
        {name:"GroupA", description:"Group A", member:[]},
        {name:"GroupB", description:"Group B", member:[
            {uid:"John",nickname:"John1"},
            {uid:"Ray",nickname:"Ray1"}
        ]},
        {name:"GroupC", description:"Group C", member:[
            {uid:"Lawrence",nickname:"Lawrence1"},
            {uid:"Ray",nickname:"Ray1"}
        ]}
    ],
    messages: [
        {from:"John", to: "Evan", chattype: "one", content_type: "str", content:"hello"},
        {from:"Lawrence", to: "Ray", chattype: "one", content_type: "str", content:"hello ray"},
        {from:"John", to: "GroupB", chattype: "group", content_type: "str",content:"hello1"},
        {from:"John", to: "GroupB", chattype: "group", content_type: "str",content:"hello2"},
        {from:"Lawrence", to: "GroupC", chattype: "group", content_type: "str",content:"hello3"},
        {from:"Lawrence", to: "GroupC", chattype: "group", content_type: "str",content:"hello4"}
    ]
};