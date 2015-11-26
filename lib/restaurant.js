/**
 * Created by JiaHao on 17/11/15.
 */

var fs = require('fs');
var crypto = require('crypto');
var Server = require('./server');

function generateSecret() {
    return crypto.randomBytes(20).toString('hex');
}

/**
 * @callback restaurantCallback
 * @param error
 * @param secret {string} Secret key
 */

/**
 *
 */

/**
 *
 * @param port
 * @param settings
 * @param settings.port
 * @param settings.scriptDir
 * @param [settings.secret]
 * @param callback {restaurantCallback}
 * @constructor
 */
function Restaurant(settings, callback) {

    var secret = settings.secret || generateSecret();
    var port = settings.port;  // todo port fallback
    var scriptDir = settings.scriptDir;

    console.log('Your secret key is: ', secret);
    this.server = new Server(port, secret, scriptDir);
    this.server.listen(function () {
        console.log('Listening for post requests at port', port);
        callback(null, secret);
    });
}

Restaurant.prototype = {
    constructor: Restaurant,

    close: function () {
        this.server.close();
    }
}

module.exports = Restaurant;
