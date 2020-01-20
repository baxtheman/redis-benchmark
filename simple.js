var random = require('random-string-generator');
var as = require('async');
var redis = require("redis");
const perf = require('execution-time')();


var array = [];

//create
for (let index = 0; index < 3000; index++) {

    tmp = index + ', ' + random(1000).substring(0, 15);

    array.push(tmp);
}

//log

perf.start();

for (let i = 0; i < array.length; i++) {

    console.log(array[i]);
}

const results = perf.stop();
console.log(results.time); // in milliseconds