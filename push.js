var random = require('random-string-generator');
var as = require('async');
const perf = require('execution-time')();
var async = require('async');

const TextChart = require("text-chart");
const barChart = new TextChart.BarChart({
    width: 20
});

var redis = require("redis");
var client = redis.createClient({});

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });


var array = [];

//create
for (let index = 0; index < 10000; index++) {

    tmp = random(1000);

    array.push(tmp);
}
console.log('created...');


//push
// redis-benchmark.exe -t lpush,rpop -d 10000 -n 10000 -c 1

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
                ["pop", results2]
            ]);
            console.log(barChart.render());

            client.quit();
            process.exit(0);
        }
    );
}

perf.start();

client.LPUSH('q1', array, function () {
    console.log('wait...');
    waitpop();
});

// async.each(array, function (elem, callback) {

//     client.LPUSH('q1', elem);
//     callback();

// }, function (err) {
//     console.log('wait...');
//     waitpop();
// });