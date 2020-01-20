var random = require('random-string-generator');
var as = require('async');
const perf = require('execution-time')();

perf.start();

var tmp = "";

for(let index = 0; index < 3000; index++) {

    tmp = index + ', ' + random(5000).substring(0,15);

    console.log(tmp);
}
console.log(tmp);

const results = perf.stop();
console.log(results.time);  // in milliseconds
