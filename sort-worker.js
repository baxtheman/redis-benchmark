 module.exports = {
     init: function() {

     },

     process: function(data) {

        if (data instanceof Buffer) {

            var str = data.toString('utf8');

            var f = str.split('').sort();
        }
     }
 };