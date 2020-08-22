var as = require('async');
var ReverseMd5 = require('reverse-md5')

var redis = require("redis");
var client = redis.createClient({});

var _len = 4;
var _queue = 'md5';

var reverseMd5 = ReverseMd5({
    lettersUpper: false,
    lettersLower: true,
    numbers: false,
    special: false,
    whitespace: false,
    maxLen: _len
})

as.forever(
    function (next) {
        client.BRPOP(_queue, 0, function (list, data) {

            if (data) {

                var hashed = data[1];
                console.log(hashed);

                console.log(
                    reverseMd5(hashed));
            }

            next();
        });
    },
    function (err) {
        console.error(err);
        client.quit();
        process.exit(0);
    }
);