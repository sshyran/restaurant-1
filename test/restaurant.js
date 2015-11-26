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

var settings = {
    port: PORT,
    scriptDir: SHELL_SCRIPT_PATH,
    secret: 'randomSecret'
}

describe('Rest-aurant Tests', function () {
    this.timeout(TIMEOUT);


    describe('Restaurant object', function () {
        it('Can specify a secret', function (done) {
            var restaurant = new Restaurant(settings, function (error, secret) {
                restaurant.close();
                assert.equal(settings.secret, secret, 'The specified secret should propogate to the required secret')
                done(error);
            });
        });

        it('Can generate a secret', function (done) {
            var settingsWithoutSecret = JSON.parse(JSON.stringify(settings));
            settingsWithoutSecret.secret = null;
            var restaurant = new Restaurant(settings, function (error, secret) {
                restaurant.close()
                assert.isTrue(secret.length > 10, 'Callback should return a secret');
                done(error);
            });
        });
    });

    describe('Requests', function () {
        before(function(done) {
            new Restaurant(settings, function (error, secret) {
                 done(error);
            });
        });

        it('Can respond to correct requests', function (done) {
            request.post({
                    url: API_ENDPOINT,
                    json: {secret: settings.secret}
                },
                function (error, response, body) {
                    if (error) {
                        done(error);
                        return;
                    }
                    assert.isNotOk(body.error, 'No error should be returned');
                    done();
                }
            );
        });

        it('Can respond to incorrect requests', function (done) {
            const WRONG_KEY = 'wrongkey';
            request.post({
                    url: API_ENDPOINT,
                    json: {secret: WRONG_KEY}
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
