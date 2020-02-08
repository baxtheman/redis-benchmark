var as = require('async');
var redis = require("redis");
const perf = require('execution-time')();
const fs = require('fs');

var myArgs = process.argv.slice(2);

var N = myArgs[0] || 1000;
var __FILE = myArgs[1] || './data.txt';

let content = fs.readFileSync(__FILE, 'utf-8', 'r+');
var array = [];

//create
for (let index = 0; index < N; index++) {

    tmp = content.toString();

    array.push(tmp);
}

//log
console.log('wait...' + N + ' x ' + content.length + ' ' + __FILE);

perf.start();
var cnt = 0;
var f = null;

for (let i = 0; i < array.length; i++) {

    f = array[i].split('').sort();
    cnt++;

    if (cnt % 50 == 0) process.stdout.write(".");
    //console.log(cnt + ': ' + f.join().substring(0, 15));
}

console.log(f.join().substring(0, 1));

const results = perf.stop();
console.log(Math.round(results.time)); // in milliseconds