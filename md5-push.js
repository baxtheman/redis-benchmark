var randomstring = require("randomstring");
const crypto = require('crypto')
var async = require('async');

var redis = require("redis");
var client = redis.createClient({});

/**
 * generate md5 hash from strings (fixed lenght) 
 * and queue to redis
 */

var _len = 4;
var _wait = 500;
var _queue = 'md5';

client.DEL(_queue);

async.forever(
    function (forever) {

        async.waterfall([

            function (next) {

                var rnd = randomstring.generate({
                    length: _len,
                    charset: 'qwerasdfgcvbnoiuy'
                });

                var hashed = crypto.createHash('md5')
                    .update(rnd).digest("hex");

                next(null, rnd, hashed);
            },

            function (rnd, hashed, next) {

                client.LLEN(_queue, (ret, len) => {

                    next(null, rnd, hashed, len || 0);
                })
            },

            function (rnd, hashed, len, next) {

                console.log(rnd + ' ' + '.'.repeat(len));

                client.LPUSH(_queue, hashed, (ret) => {

                    //c# client needs this
                    client.PUBLISH(_queue, true);
                    setTimeout(next, _wait);
                });
            }
        ], function (err, result) {
            
            forever();
        })
    }
);