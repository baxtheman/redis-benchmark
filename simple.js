var random = require('random-string-generator');
var as = require('async');
const perf = require('execution-time')();

perf.start();

for(let index = 0; index < 1000; index++) {
    console.log(index + ', ' + random(2000).substring(0,15));
}

const results = perf.stop();
console.log(results.time);  // in milliseconds
