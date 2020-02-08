const { createWorker } = require('tesseract.js');
var as = require('async');

var client = require("redis").createClient({});
var cnt = 0;

as.forever(
    function (next) {
        client.BRPOP('images1', 0, function (list, data) {
            
            if (data) {
                console.log(data);

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