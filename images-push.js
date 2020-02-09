const perf = require('execution-time')();
var async = require('async');
const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');
var redis = require("redis");
const TextChart = require("text-chart");


var client = redis.createClient({});

var myArgs = process.argv.slice(2);
var __DIR = myArgs[0] || './';

const REDIS_QUEUE = 'images1';
var N = 0;

client.FLUSHALL();

async.waterfall([
    sendFiles,
    waitpop
]);


///

function sendFiles(callback) {

    //passsing directoryPath and callback function
    fs.readdir(__DIR, function (err, files) {

        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        const images = files.filter(el => /\.jpg$/.test(el));
        N = images.length;
        var KEYP = 'image:';

        async.each(images, function (file, eachfn) {

            var key = KEYP + file;
            var content = fs.readFileSync(
                path.join(__DIR, file));

            async.waterfall([
                (callback) =>
                    client.HMSET(key, {
                            file: file,
                            content: content
                        }, 
                        () => callback()
                    ),

                (callback) =>
                    client.LPUSH(REDIS_QUEUE, key,
                        () => callback()),

                (callback) =>
                    client.PUBLISH(REDIS_QUEUE, true,
                        () => callback())
            ], () => 
                eachfn());
        });

        console.log('all files sent');
        if (callback) callback(null);
    });
}

function waitpop() {
    perf.start();

    const barChart = new TextChart.BarChart({
        width: 20
    });
    
    const bar1 = new cliProgress.SingleBar({
        clearOnComplete: true,
        stream: process.stdout,
        hideCursor: true
    }, cliProgress.Presets.rect);

    bar1.start(N, N);

    async.forever(

        function (next) {
            var prev = 0;
            client.LLEN(REDIS_QUEUE, function (err, len) {

                if (len == 0) next('len=0');

                if (prev != len) {
                    bar1.update(len);
                    prev = len;
                }

                setTimeout(next, 1000);
            });
        },

        function (err) {
            bar1.stop();
            const results2 = Math.round(perf.stop().time);

            barChart.setData([
                ["pop", results2],
                ["fps", N / (results2 / 1000)]
            ]);
            console.log(barChart.render());

            console.log('QUIT ' + err);
            client.quit();
            process.exit(0);
        }
    );
}
