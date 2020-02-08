var as = require('async');

var redis = require("redis"),
    client = redis.createClient({
    });

var cnt = 0;

as.forever(
    function (next) {
        client.BRPOP('q1', 0, function (list, data) {

            if (data) {

                var f = data[1].split('').sort();
                cnt++;

                if (cnt % 50 == 0) process.stdout.write(".");
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