/**
 * Created by JiaHao on 17/11/15.
 */

var fs = require('fs');
var request = require('request');
var assert = require('chai').assert;
var Server = require('./../lib/server');

const PORT = 6538;
const TEST_SECRET = 'testSecret';
const WRONG_SECRET = 'wrongkey';
const API_ENDPOINT = 'http://127.0.0.1:' + PORT.toString();
const SHELL_SCRIPT_PATH =  __dirname + '/scripts/correct.sh';
const TIMEOUT = 5000;


describe ('Server tests', function () {
    this.timeout(TIMEOUT);

    before(function (done) {
        var server = new Server(PORT, TEST_SECRET, SHELL_SCRIPT_PATH);
        server.listen(done);

    })
    it ('Can respond to correct requests', function (done) {
        request.post({
                url: API_ENDPOINT,
                json: { secret: TEST_SECRET }
            },
            function (error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                assert.isNotOk(body.error);
                done();
            }
        );
    });

    it ('Can respond to incorrect requests', function (done) {
        request.post({
                url: API_ENDPOINT,
                json: { secret: WRONG_SECRET }
            },
            function (error, response, body) {
                if (error) {
                    done(error);
                    return;
                }
                assert.isOk(body.error);
                done();
            }
        );
    });
});
