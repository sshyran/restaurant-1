#!/usr/bin/env node

var program = require('commander').command('restaurant');
var path = require('path');
var packageJson = require(path.join('..', 'package'));
var fs = require('fs');
var Restaurant = require('./restaurant');
var CONFIG_NAME = '.restaurant';

var configDir = path.join(userHomeDir(), CONFIG_NAME);

function userHomeDir() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

function readPreviousSettings(configDir) {
    var previousSettings;
    try {
        previousSettings = fs.readFileSync(configDir);
    } catch (error){
        if (error.code === 'ENOENT') {
            previousSettings = {};
        } else {
            console.trace(error);
            throw error;
        }
    }

    try {
        var parsed =  JSON.parse(previousSettings);
    } catch (error) {
        console.log(error);
        if (error instanceof SyntaxError) {
            throw 'Config file is invalid, run restaurant reset'
        }
        console.trace(error);
        throw error;
    }
    return parsed;
}

function addProcessArgs(settings, args) {
    var normalisedDir = null;
    if (args.d || args.dir){
        normalisedDir = path.resolve(args.d || args.dir);
    }
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

program
    .version(packageJson.version)
    .option('-c, --cmd <command>', 'command to be executed')
    .option('-d, --dir <path>', 'path to .sh script to be executed, takes priority over -c')
    .option('-p, --port <port>', 'port for the server to listen at')

program
    .command('start')
    .description('start the listener, will save configuration if successful so arguments are optional when running it again')
    .action(function() {
        try {
            var previousSettings = readPreviousSettings(configDir);
            previousSettings = addProcessArgs(previousSettings, program);
        } catch (error) {
            console.log(error);
            return;
        }

        new Restaurant(previousSettings.port, previousSettings, function () {
            fs.writeFileSync(configDir, JSON.stringify(previousSettings));
        });
    });

program
    .command('reset')
    .description('removes any history of stored configurations')
    .action(function () {
        fs.writeFileSync(configDir, '{}');
    });

program.parse(process.argv);

