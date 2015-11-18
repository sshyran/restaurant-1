/**
 * Created by JiaHao on 18/11/15.
 */

var minimist = require('minimist');
var fs = require('fs');
var path = require('path');
var Restaurant = require('./restaurant');

var packageJson = require(path.join('..', 'package'));
var tempDir = path.join(__dirname, '..', 'temp', 'settings.json');

var usage = fs.readFileSync(path.join(__dirname, 'usage.txt')).toString();

function parseArgs(args) {
    if (args.h || args.help) {
        console.log(usage);
        return;
    }

    if (args.v || args.version) {
        console.log(packageJson.version);
        return;
    }

    if (args._[2] === 'start') {
        var previousSettings;
        try {
            previousSettings = fs.readFileSync(tempDir).toString();
        } catch (error){
            if (error.code === 'ENOENT') {
                previousSettings = {};
            } else {
                throw error;
            }
        }

        try {
            previousSettings = argsToSettings(previousSettings, args);
        } catch (error) {
            // catch invalid arguments
            console.error(error);
            return;
        }

        new Restaurant(previousSettings.port, previousSettings, function () {
            fs.writeFile(tempDir, JSON.stringify(previousSettings));
        });
    }
}

function argsToSettings(settings, args) {
    var normalisedDir = path.resolve(args.d || args.dir);
    settings.port = args.p || args.port || settings.port;
    settings.scriptDir = normalisedDir || settings.scriptDir;
    settings.cmd = args.c || args.cmd || settings.cmd;

    if (!(settings.scriptDir || settings.cmd)) {
        throw 'Either --dir or --cmd needs to be set';
    }

    if (!settings.port) {
        throw '--port needs to be set';
    }

    return settings;
}

if (require.main === module) {

    var args = minimist(process.argv);
    parseArgs(args);
}