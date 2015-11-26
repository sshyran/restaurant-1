/**
 * Created by JiaHao on 17/11/15.
 */

var spawn = require('child_process').spawn;

/**
 * @param scriptDir
 * @param [callback] for tests
 */
function runShell(scriptDir, suppressLogs, callback) {
    callback = callback || function () {};

    if (suppressLogs) {
        log = function () {};
        errorLog = function () {};
    } else {
        log = function () {
            console.log.apply(this, arguments);
        }
        errorLog = function () {
            console.error.apply(this, arguments);
        }
    }

    log('Running script at path:', scriptDir);

    var script = spawn('sh', [scriptDir]);

    script.stdout.on('data', function (data) {
        log('stdout: ' + data);
    });

    script.stderr.on('data', function (data) {
        errorLog('stderr: ' + data);
    });

    script.on('exit', function (code) {
        if (code) {
            callback(code);
            log('child process exited with code ' + code);
            return;
        }

        callback();
    });
}

module.exports = runShell;
