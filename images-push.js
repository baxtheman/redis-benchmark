var as = require('async');
const perf = require('execution-time')();
var async = require('async');
const fs = require('fs');
const path = require('path');
const cliProgress = require('cli-progress');

const TextChart = require("text-chart");
const barChart = new TextChart.BarChart({
    width: 20
});

var myArgs = process.argv.slice(2);

var __DIR = myArgs[0] || './';
var N = 0;

var redis = require("redis");
var client = redis.createClient({});

const REDIS_QUEUE = 'images1';
//push
// redis-benchmark.exe -t lpush,rpop -d 1000 -n 10000 -c 1

var waitpop = function () {
    // wait pop

    perf.start();

    const bar1 = new cliProgress.SingleBar({
        clearOnComplete: true,
        stream: process.stdout,
        hideCursor: true
    }, cliProgress.Presets.rect);

    bar1.start(N, N);

    as.forever(

        function (next) {
            var prev = 0;
            client.LLEN(REDIS_QUEUE, function (err, len) {

                if (len == 0) next('sss');

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

            client.quit();
            process.exit(0);
        }
    );
}

///////////////////////////

client.FLUSHALL();

//passsing directoryPath and callback function
fs.readdir(__DIR, function (err, files) {

    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    const images = files.filter(el => /\.jpg$/.test(el));
    N = images.length;
    var KEYP = 'image:';

    //listing all files using forEach
    images.forEach(function (file) {

        var key = KEYP + file;
        var content = fs.readFileSync(path.join(__DIR, file));

        client.HMSET(key, {
            file: file,
            content: content
        }, (err, reply) => {
            if (err) {
                console.error(err);
            }
        });

        //debugger;
        client.LPUSH(REDIS_QUEUE, key, () => {

            //c# client needs this
            client.PUBLISH(REDIS_QUEUE, true);
        });
    });

    console.log('wait...' + images.length);
    waitpop();
});
