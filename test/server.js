/**
 * Created by JiaHao on 17/11/15.
 */

var fs = require('fs');
var request = require('request');
var assert = require('chai').assert;
var Server = require('./../lib/server');

const PORT = 6538;
const TEST_KEY = 'abcdef';
const API_ENDPOINT = 'http://127.0.0.1:' + PORT.toString();
const SHELL_SCRIPT_PATH =  __dirname + '/scripts/correct.sh';
const TIMEOUT = 5000;

var cmd = fs.readFileSync(SHELL_SCRIPT_PATH);

var server = new Server(PORT, TEST_KEY, cmd);
server.listen();

describe ('Server tests', function () {
    this.timeout(TIMEOUT);
    it ('Can respond to correct requests', function (done) {
        request.post({
                url: API_ENDPOINT,
                json: { key: TEST_KEY }
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
        const WRONG_KEY = 'wrongkey';
        request.post({
                url: API_ENDPOINT,
                json: { key: WRONG_KEY }
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
