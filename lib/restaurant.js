/**
 * Created by JiaHao on 17/11/15.
 */

var fs = require('fs');
var crypto = require('crypto');
var Server = require('./server');

function generateKey() {
    return crypto.randomBytes(20).toString('hex');
}

/**
 * @callback restaurantCallback
 * @param error
 * @param secret {string} Secret key
 */

/**
 *
 * @param port
 * @param cmdOptions cmdOptions.scriptDir always takes priority over cmdOptions.cmd
 * @param callback {restaurantCallback}
 * @constructor
 */
function Restaurant(port, cmdOptions, callback) {
    var cmd = cmdOptions.cmd;

    if (cmdOptions.scriptDir) {
        cmd = fs.readFileSync(cmdOptions.scriptDir);
    }

    var key = generateKey();
    console.log('Your secret key is: ', key);
    var server = new Server(port, key, cmd);
    server.listen(function () {
        console.log('Listening for post requests at port', port);
        callback(null, key);
    });
}

module.exports = Restaurant;
