var random = require('random-string-generator');
var as = require('async');
const perf = require('execution-time')();

var redis = require("redis"),
    client = redis.createClient();
 
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
 
client.on("error", function (err) {
    console.log("Error " + err);
});
 
for(let index = 0; index < 1000; index++) {

    client.LPUSH('q1', 
        index + ', ' + random(1000));  
}

//at beginning of your code
perf.start();

as.forever(
    function(next) {
        client.LLEN('q1', function(err,len) {
            if (len == 0) next('sss');
            next();
        });
    },
    function(err) {
        const results = perf.stop();
        console.log(results.time);  // in milliseconds
        client.quit();
    }
);
    
