var random = require('random-string-generator');
var as = require('async');
var redis = require("redis");
const perf = require('execution-time')();


var array = [];

//create
for (let index = 0; index < 3000; index++) {

    tmp = random(1000);
    
    array.push(tmp);
}

//log

perf.start();
var cnt = 0;

for (let i = 0; i < array.length; i++) {

    var f = array[i].split('').sort();
    cnt++;

   // console.log(cnt + ': ' + f.join().substring(0,15));
}

const results = perf.stop();
console.log(results.time); // in milliseconds