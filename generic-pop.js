var async = require('async');
var path = require('path');
var client = require("redis").createClient({});

var cnt = 0;

var myArgs = process.argv.slice(2);
var __QUEUE = myArgs[0];
var __WORKER = myArgs[1];

var worker = require( path.resolve( __dirname, __WORKER ) );

worker.init();

(function _forever() {

    async.forever(
        function (next) {

            async.waterfall([
                (callback) =>
                client.BRPOP(__QUEUE, 0,
                    (list, data) => {

                        if (data) {
                            console.log(data);
                            cnt++;
                            if (cnt % 50 == 0) process.stdout.write(".");

                            callback(null, data);
                        } else {

                            callback('no-data');
                        }
                    }
                ),

                (data, callback) => {
                    var key = data[1];
                    client.HGETALL(key, (err, value) => {

                        var bin = new Buffer(value.content, 'hex');

                        worker.process(bin);
                    });
                }
            ], function (err) {
                next();
            });

        },
        function (err) {
            console.error(err);
            client.quit();
            process.exit(0);
        }
    );

})();

