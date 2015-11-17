/**
 * Created by JiaHao on 17/11/15.
 */

var fs = require('fs');
var assert = require('chai').assert;

var runShell = require('./../lib/runShell');

const CORRECT_SCRIPT = __dirname + '/scripts/correct.sh';
const FAILING_SCRIPT = __dirname + '/scripts/failing.sh';

describe('Running shell scripts', function () {
    it('Can run correct shell scripts without error', function (done) {
        var cmd = fs.readFileSync(CORRECT_SCRIPT);
        runShell(cmd, function (error, stdout) {
            if (error) {
                done(error);
                return;
            }
            assert.isOk(stdout, 'Some stdout should be printed');
            done();

        });
    });

    it('Can fail gracefully on bad shell scripts', function (done) {
        var cmd = fs.readFileSync(FAILING_SCRIPT);
        runShell(cmd, function (error, stdout) {
            if (error) {
                assert.isOk(error, 'Error should be something');
                done();
                return;
            }
            done('No stdout should be returned if there is an error');
        });
    });
});