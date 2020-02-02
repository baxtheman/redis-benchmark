var as = require('async');
var child_process = require('child_process');
var myArgs = process.argv.slice(2);
var processes = [];

//// PROCESSES /////

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

    
startProcesses(myArgs[0] || 0);

//// REDIS SUBSCRIBE /////

var redis = require("redis"),
    client = redis.createClient();

client.SUBSCRIBE('proc');

client.on('message', function (channel, message) {

    if ("proc" === channel && "stop" === message) {

        client.quit();
        killProcesses();
        process.exit(0);
    }

    var N = parseInt(message);

    if ("proc" === channel && N !== NaN) {
        
        startProcesses(N);
    }
});

function startProcesses(_n) {
    killProcesses();
    console.log('starting ', _n);
    
    Array.from(Array(_n)).forEach((x, i) => {

        processes.push(child_process.fork('pop.js'));
    });

    return processes;
}
