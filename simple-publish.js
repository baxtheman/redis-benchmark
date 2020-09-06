var async = require('async');

var redis = require("redis");
var client = redis.createClient({});

var _wait = 100;
var _queue = 'simple';
var _cnt = 1;

console.log(_queue);

client.DEL(_queue);

async.forever(
    function (next) {

        var msg = "data--" + _cnt++;
        console.log(msg);

        client.PUBLISH(_queue, msg);

        setTimeout(next, _wait);
    }
);