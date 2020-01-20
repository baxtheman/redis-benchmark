var as = require('async');

var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

var cnt = 0;

as.forever(
    function (next) {
        client.BRPOP('q1', 50, function (list, data) {

            if (data) {
                var f = data[1].split('').sort();
                cnt++;

                //console.log(cnt + ': ' + f.join().substring(0, 15));
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