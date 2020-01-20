var random = require('random-string-generator');
var as = require('async');
const perf = require('execution-time')();

const TextChart = require("text-chart");
const barChart = new TextChart.BarChart({
    width: 20
});

var redis = require("redis");
var client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });


var array = [];

//create
for (let index = 0; index < 3000; index++) {

    tmp = random(1000);

    array.push(tmp);
}

//push

perf.start();

client.LPUSH('q1', array, function () {

    const results1 = perf.stop();
    //wait

    perf.start();

    as.forever(

        function (next) {
            client.LLEN('q1', function (err, len) {

                if (len == 0) next('sss');

                setTimeout(() => {
                    next();
                }, 10);

                //next();
            });
        },

        function (err) {
            const results2 = perf.stop();

            barChart.setData([["lpush", results1.time],["pop", results2.time]]);
            console.log(barChart.render());

            client.quit();
            process.exit(0);
        }
    );
});