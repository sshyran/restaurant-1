/**
 * Created by JiaHao on 17/11/15.
 */

var express = require('express');
var bodyParser = require('body-parser');
var runShell = require('./runShell');

/**
 *
 * @param port
 * @param secret
 * @param scriptDir
 * @param suppressLogs
 * @constructor
 */
function Server(port, secret, scriptDir, suppressLogs) {
    var self = this;
    self.port = port;
    self.secret = secret;
    self.scriptDir = scriptDir;

    self.app = express();
    self.app.use(bodyParser.json());

    self.app.post('/', function (req, res) {
        console.log('Secrets:', req.body.secret, self.secret);
        if (req.body.secret === self.secret) {
            res.send({
                body: 'Executing script...'
            });

            runShell(scriptDir, suppressLogs);
            return;
        }

        res.send({
            error: 'invalid secret'
        });
    });
}

Server.prototype = {
    constructor: Server,
    listen: function (callback) {
        this.server = this.app.listen(this.port, function (error) {
            if (callback) {
                callback(error);
            }
        });
    },
    close: function () {
        this.server.close();
    }
};

module.exports = Server;
