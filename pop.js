var as = require('async');

var redis = require("redis"),
    client = redis.createClient();
 
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
 
client.on("error", function (err) {
    console.log("Error " + err);
});

var cnt = 0;

as.forever(
    function(next) {
        // next is suitable for passing to things that need a callback(err [, whatever]);
        // it will result in this function being called again.
        client.BRPOP('q1', 100, function (list, data) {
            console.log(data.toString().substring(0,15));
            
            setTimeout(() => {
                next();
            }, 5);
        });  
    },
    function(err) {
        console.error(err);
        client.quit();
    }
);

