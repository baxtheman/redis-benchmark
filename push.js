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

    tmp = random(1000);

    array.push(tmp);
}

//push

perf.start();


//wait

as.waterfall([
    function (callback) {

        for (let i = 0; i < array.length; i++) {

            client.LPUSH('q1', array[i]);
        }
        callback(null);
    },
    function (callback) {

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
    }
])