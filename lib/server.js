/**
 * Created by JiaHao on 17/11/15.
 */


var express = require('express');


const PORT = process.env.PORT || 67391;





function Server (port, key, scriptDir) {

    var app = express();
    app.post('/', function (req, res) {
        res.send('Hello World!');
    });
}


Server.prototype = {
    constructor: server,

    listen: function () {
         this.server = app.listen(PORT, function () {
            var host = server.address().address;
            var port = server.address().port;
            console.log('Example app listening at http://%s:%s', host, port);
        });
    }
};

