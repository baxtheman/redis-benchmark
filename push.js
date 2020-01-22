var random = require('random-string-generator');
var as = require('async');
const perf = require('execution-time')();
var async = require('async');
const fs = require('fs');
const cliProgress = require('cli-progress');

const TextChart = require("text-chart");
const barChart = new TextChart.BarChart({
    width: 20
});

var myArgs = process.argv.slice(2);

var N = myArgs[0] || 10000;
var __FILE = myArgs[1] || './data.txt';

var redis = require("redis");
var client = redis.createClient({});

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
            client.LLEN('q1', function (err, len) {

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

let content = fs.readFileSync(__FILE, 'utf-8', 'r+');

perf.start();

for (let index = 0; index < N; index++) {

    client.LPUSH('q1', content.toString(), () => {
        client.PUBLISH('q1', true);
    });
}

console.log('wait...' + N + ' x ' + content.length + ' ' + __FILE);
waitpop();