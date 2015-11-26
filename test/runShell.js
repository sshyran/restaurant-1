/**
 * Created by JiaHao on 17/11/15.
 */

var fs = require('fs');
var assert = require('chai').assert;

var runShell = require('./../lib/runShell');

const CORRECT_SCRIPT = __dirname + '/scripts/correct.sh';
const FAILING_SCRIPT = __dirname + '/scripts/failing.sh';
const TIMEOUT = 5000;
const SUPPRESS_LOGS = true;

describe('Running shell scripts', function () {
    this.timeout(TIMEOUT);
    it('Can run correct shell scripts without error', function (done) {
        runShell(CORRECT_SCRIPT, SUPPRESS_LOGS, function (error, stdout) {
            if (error) {
                done(error);
                return;
            }

            done();
        });
    });

    it('Can fail gracefully on bad shell scripts', function (done) {
        var cmd = fs.readFileSync(FAILING_SCRIPT);
        runShell(FAILING_SCRIPT, SUPPRESS_LOGS, function (error, stdout) {
            if (error) {
                assert.isOk(error, 'Error should be something');
                done();
                return;
            }
            done('No stdout should be returned if there is an error');
        });
    });
});