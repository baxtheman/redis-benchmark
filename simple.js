var random = require('random-string-generator');
var as = require('async');
var redis = require("redis");
const perf = require('execution-time')();
const fs = require('fs');

let content = fs.readFileSync('./data.txt', 'utf-8', 'r+');
var array = [];

//create
for (let index = 0; index < 1000; index++) {

    tmp = content.toString();

    array.push(tmp);
}

//log

perf.start();
var cnt = 0;
var f = null;

for (let i = 0; i < array.length; i++) {

    f = array[i].split('').sort();
    cnt++;

    //console.log(cnt + ': ' + f.join().substring(0, 15));
}

console.log(f.join().substring(0, 1));

const results = perf.stop();
console.log(Math.round(results.time)); // in milliseconds