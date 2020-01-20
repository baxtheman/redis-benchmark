var random = require('random-string-generator');
var as = require('async');
const perf = require('execution-time')();


var redis = require("redis");
var client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });


var array = [];

//create
for (let index = 0; index < 3000; index++) {

    tmp = index + ', ' + random(1000).substring(0, 15);

    array.push(tmp);
}

perf.start();

for (let i = 0; i < array.length; i++) {

    client.LPUSH('q1', array[i]);
}

as.forever(
    function (next) {
        client.LLEN('q1', function (err, len) {

            if (len == 0) next('sss');

            setTimeout(() => {
                next();
            }, 5);

            //next();
        });
    },
    function (err) {
        const results = perf.stop();
        console.log(results.time); // in milliseconds
        client.quit();
        process.exit(0);
    }
);