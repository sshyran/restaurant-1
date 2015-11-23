/**
 * Created by JiaHao on 17/11/15.
 */

var express = require('express');
var bodyParser = require('body-parser');
var runShell = require('./runShell');

function Server(port, key, scriptDir) {
    var self = this;
    self.port = port;
    self.key = key;
    self.scriptDir = scriptDir;

    self.app = express();
    self.app.use(bodyParser.json());

    self.app.post('/', function (req, res) {
        if (req.body.key === self.key) {
            res.send({
                body: 'Executing script...'
            });

            runShell(scriptDir);
            return;
        }

        res.send({
            error: 'invalid key'
        });
    });
}

Server.prototype = {
    constructor: Server,
    listen: function (callback) {
        this.app.listen(this.port, function () {
            if (callback) {
                callback(null);
            }
        });
    }
};

module.exports = Server;
