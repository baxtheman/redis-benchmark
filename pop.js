var as = require('async');

var redis = require("redis"),
    client = redis.createClient();
client2 = redis.createClient();

var cnt = 0;

//client.SUBSCRIBE("q1", function(err) {
//})

as.forever(
    function (next) {
        client2.BRPOP('q1', 0, function (list, data) {

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