/**
 * Created by JiaHao on 17/11/15.
 */

var express = require('express');
var bodyParser = require('body-parser');
var runShell = require('./runShell');

function Server(port, key, cmd) {
    var self = this;
    self.port = port;
    self.key = key;
    self.cmd = cmd;

    self.app = express();
    self.app.use(bodyParser.json());

    self.app.post('/', function (req, res) {
        if (req.body.key === self.key) {
            res.send({
                body: 'Executing script...'
            });

            runShell(cmd);
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

if (require.main === module) {
    var server = new Server(105012, 'dsadas');
    server.listen();
}
