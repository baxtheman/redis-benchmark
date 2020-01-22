var random = require('random-string-generator');
var as = require('async');
const perf = require('execution-time')();
var async = require('async');
const fs = require('fs');

const TextChart = require("text-chart");
const barChart = new TextChart.BarChart({
    width: 20
});

var N = 10000;
var redis = require("redis");
var client = redis.createClient({});

//push
// redis-benchmark.exe -t lpush,rpop -d 1000 -n 10000 -c 1

var waitpop = function () {
    // wait pop

    perf.start();

    as.forever(

        function (next) {
            client.LLEN('q1', function (err, len) {

                if (len == 0) next('sss');

                setTimeout(next, 10);
            });
        },

        function (err) {
            const results2 = Math.round(perf.stop().time);

            barChart.setData([
                ["pop", results2],
                ["fps",  N / (results2/1000)]
            ]);
            console.log(barChart.render());

            client.quit();
            process.exit(0);
        }
    );
}

let content = fs.readFileSync('./data.txt', 'utf-8', 'r+');

perf.start();

for (let index = 0; index < N; index++) {

    client.LPUSH('q1', content.toString(), () => {
        client.PUBLISH('q1',true);
    });
}

console.log('wait...' + N + ' x ' + content.length);
waitpop();

