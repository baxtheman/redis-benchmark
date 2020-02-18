const perf = require('execution-time')();
var async = require('async');
const cliProgress = require('cli-progress');
const TextChart = require("text-chart");

var redis = require("redis");
var client = redis.createClient({});

var myArgs = process.argv.slice(2);
var REDIS_QUEUE = myArgs[0] || '';
var prev = -1;

console.log('list ' + REDIS_QUEUE);

async.forever(

    function (next) {

        client.LLEN(REDIS_QUEUE, function (err, len) {

            if (prev != len) {

                console.log(len);
                prev = len;
            }

            setTimeout(next, 1000);
        });
    }
);

