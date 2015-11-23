/**
 * Created by JiaHao on 17/11/15.
 */

var spawn = require('child_process').spawn;

/**
 * @param scriptDir
 * @param [callback] for tests
 */
function runShell(scriptDir, callback) {
    callback = callback || function () {};

    var script = spawn('sh', [scriptDir]);

    script.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });

    script.stderr.on('data', function (data) {
        console.error('stderr: ' + data);
    });

    script.on('exit', function (code) {
        if (code) {
            callback(code);
            console.log('child process exited with code ' + code);
            return;
        }

        callback();
    });
}

module.exports = runShell;
