let fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    config = require('config'),
    pm2 = require('pm2'),
    {rmDir} = require('../shared/utilities'),
    mkdirp = require('mkdirp');

let isDebug = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
function pm2RestartCron() {
    setTimeout(function worker() {
        pm2.restart('app', function() {});
    }, 24 * 60 * 60 *1000);
}

async function createDirectories(){

    global.directories = {
        userPics: path.join(__dirname, '..', 'public', 'images', 'users'),
        tmp: path.join(__dirname, '..', 'tmp')
    };
    return Promise.all(_.map(global.directories,(dir)=>{
        isDebug && fs.existsSync(dir) && rmDir(dir);
        return new Promise((resolve) => mkdirp(dir, resolve))
    }));
}
function clearStorage() {
    let sqlLite = path.join(...[].concat(__dirname, config.get('sequelize.storage')));
    fs.existsSync(sqlLite) && fs.unlinkSync(sqlLite);
}
function setUrls(){
    let serverUrl = config.get('server.url');
    global.urls = {
        userPics: `${serverUrl}images/users/`
    };
}
module.exports = async function () {
    pm2RestartCron();
    await createDirectories();
    !isDebug && clearStorage();
    setUrls();
};
