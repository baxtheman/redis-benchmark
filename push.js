var random = require('random-string-generator');
var as = require('async');
const perf = require('execution-time')();
var async = require('async');
const fs = require('fs');

const TextChart = require("text-chart");
const barChart = new TextChart.BarChart({
    width: 20
});

var redis = require("redis");
var client = redis.createClient({});

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

let content = fs.readFileSync('./data.txt', 'utf-8', 'r+');
var array = [];

//create
for (let index = 0; index < 1000; index++) {

    //var tmp = random(1000);
    var tmp = content.toString();

    array.push(tmp);
}
console.log('created...' +  array.length);


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
                ["pop", results2]
            ]);
            console.log(barChart.render());

            client.quit();
            process.exit(0);
        }
    );
}

perf.start();

// client.LPUSH('q1', array, function (ret) {
//     console.log('wait...' + ret.args.length);
//     waitpop();
// });

async.each(array, function (elem, callback) {

    client.LPUSH('q1', elem);
    callback();

}, function (err) {
    console.log('wait...');
    waitpop();
});