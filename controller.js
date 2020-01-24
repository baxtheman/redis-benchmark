var as = require('async');
var child_process = require('child_process');

var redis = require("redis"),
    client = redis.createClient();

client2 = redis.createClient();

var processes = [];

var killProcesses = function () {
    console.log('killing', processes.length);

    processes.forEach(function (child) {
        child.kill();
    });

    processes = [];
};

process.on('SIGINT', () => {
    killProcesses(); process.exit(0);}); // catch ctrl-c
process.on('SIGTERM', () => {
    killProcesses(); process.exit(0);}); // catch kill

client.SUBSCRIBE('proc');

client.on('message', function (channel, message) {

    if ("proc" === channel && "stop" === message) {

        client.quit();
        killProcesses();
        process.exit(0);
    }

    var N = parseInt(message);

    if ("proc" === channel && N !== NaN) {

        killProcesses();

        console.log('starting ', N);

        Array.from(Array(N)).forEach((x, i) => {

            processes.push(child_process.fork('pop.js'));
        });
    }
});


