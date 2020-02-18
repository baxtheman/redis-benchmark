var async = require('async');
var client = require("redis").createClient({});

const Tesseract = require('tesseract.js');

var cnt = 0;

async.forever(
    function (next) {

        async.waterfall([
                (callback) =>
                client.BRPOP('images1', 0,
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
                    client.hgetall(key, (err, value) => {

                        Tesseract.recognize(
                            value.content,
                            'eng', {
                                logger: m => console.log(m)
                            }
                        ).then(({
                            data: {
                                text
                            }
                        }) => {
                            console.log("TEXT: " + text);
                        })

                        callback();
                    })
                }
            ],
            () => next());

    },
    function (err) {
        console.error(err);
        client.quit();
        process.exit(0);
    }
);