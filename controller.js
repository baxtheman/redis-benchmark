var as = require('async');
const { spawn } = require('child_process');
const { exec } = require('child_process');

var redis = require("redis"),
    client = redis.createClient();

client2 = redis.createClient();

client.SUBSCRIBE('proc');

client.on('message', function (channel, message) {

    if ("proc" === channel && "stop" === message) {

        client.quit();
        process.exit(0);
    }

    if ("proc" === channel && "new" === message) {

        exec('node pop.js', (err, stdout, stderr) => {
            if (err) {
              console.error(`exec error: ${err}`);
              return;
            }
        
            console.log(`Number of files ${stdout}`);
          });
    }
});

