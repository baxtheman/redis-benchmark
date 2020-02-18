var async = require('async');
var client = require("redis").createClient({});

const {
    createWorker
} = require('tesseract.js')
const worker = createWorker();

_forever();

var cnt = 0;

async function _forever() {

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

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
                    client.HGETALL(key, (err, value) => {

                        var bin = new Buffer(value.content, 'hex');

                        getTextFromImage(bin)
                            .then(function(data) {

                                console.log(data);
                                callback(null);
                            })
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
}

async function getTextFromImage(bin) {

    const {
        data: {
            text
        }
    } = await worker.recognize(bin);

    return text
}