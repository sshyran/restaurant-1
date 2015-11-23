/**
 * Created by JiaHao on 17/11/15.
 */

var request = require('request');
var assert = require('chai').assert;
var Restaurant = require('./../lib/restaurant');

var SHELL_SCRIPT_PATH = __dirname + '/scripts/correct.sh';
const PORT = 6539;
const API_ENDPOINT = 'http://127.0.0.1:' + PORT.toString();
const TIMEOUT = 5000;

new Restaurant(PORT, SHELL_SCRIPT_PATH, function (error, secret) {

    describe('Rest-aurant Tests', function () {
        this.timeout(TIMEOUT);
        it('Can get the secret', function () {
            assert.isTrue(secret.length > 10, 'Callback should return a secret');
        });

        it('Can respond to correct requests', function (done) {
            request.post({
                    url: API_ENDPOINT,
                    json: {key: secret}
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

        it('Can respond to incorrect requests', function (done) {
            const WRONG_KEY = 'wrongkey';
            request.post({
                    url: API_ENDPOINT,
                    json: {key: WRONG_KEY}
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
});
