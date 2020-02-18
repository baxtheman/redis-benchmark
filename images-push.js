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

console.log('list ' + REDIS_QUEUE);

client.FLUSHALL();


async.waterfall([
    sendFiles,
    () => {
        client.quit();
        process.exit(0);
    }
]);

///

function sendFiles(callbackAll) {

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
                function (callback) {
                    console.log(key);
                    client.HMSET(key,
                        "file", file,
                        "content", content);
                    callback(null);
                },

                function (callback) {

                    client.LPUSH(REDIS_QUEUE, key,
                        () => callback(null));
                },

                function (callback) {
                    client.PUBLISH('images-push', true,
                        () => callback(null));
                }
            ], function (err, result) {
                if (err) console.log(err);
                eachfn();
            });
        }, function() {

            console.log('all files sent: ' + images.length);
            callbackAll(null);
        });
    });
};