/**
 * Created by JiaHao on 17/11/15.
 */

var exec = require('child_process').exec;

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

if (require.main === module) {
    runShell('ls -l');
}


//stdout: total 8
//lrwxr-xr-x     1 root    wheel     8B Apr 13  2015 X11 -> /opt/X11
//drwxr-xr-x     3 root    wheel   102B Aug 27 10:17 adic
//drwxr-xr-x  1056 root    wheel    35K Oct 27 10:35 bin
//drwxr-xr-x   263 root    wheel   8.7K Oct 27 10:35 lib
//drwxr-xr-x   184 root    wheel   6.1K Oct 27 10:35 libexec
//drwxr-xr-x    23 JiaHao  admin   782B Oct 13 15:17 local
//drwxr-xr-x   243 root    wheel   8.1K Oct  1 19:19 sbin
//drwxr-xr-x    45 root    wheel   1.5K Oct  1 19:19 share
//drwxr-xr-x     4 root    wheel   136B Sep 17 15:03 standalone
//
//child process exited with code 0
