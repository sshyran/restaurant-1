/**
 * Created by JiaHao on 17/11/15.
 */

var exec = require('child_process').exec;

/**
 * @param cmd
 * @param [callback] for tests
 */
function runShell(cmd, callback) {
    callback = callback || function () {};

    exec(cmd, function (error, stdout, stderr) {
        if (error) {
            callback(error);
            return;
        }
        callback(null, stderr + '\n' + stdout);
    });
}

module.exports = runShell;
