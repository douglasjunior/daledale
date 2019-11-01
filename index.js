#!/usr/bin/env node
const exect = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const R = require('ramda');

const mainPath = path.dirname(fs.realpathSync(__filename));
const raparigagePath = path.join(mainPath, './raparigage');

const raparigage = function (){
    const linuxcmd = R.join('', ['paplay ', raparigagePath, '.ogg']);
    const windowscmd = R.join('', [path.join(mainPath, './forWindows.vbs'), ' ', raparigagePath, '.mp3']);
    const maccmd = R.join('', ['afplay ', raparigagePath, '.mp3']);

    const platform = process.platform;

    R.cond([
        [R.equals('linux'), exec(linuxcmd)],
        [R.equals('win32'), exec(windowscmd)],
        [R.equals('darwin'), exec(maccmd)],
    ], platform)

    function exec(cmd){
        return exect(cmd, function (error) {
            R.ifElse(
               R.empty,
               () => console.log('Alô inspetô! Como é que tá por ai papai?!'),
               (error) => console.error(error),
               error)
        });
    }
}

module.exports = raparigage;

if (!module.parent) {
    raparigage();
}
