let _ = require('lodash'),
    fs = require('fs');

function chain() {
    let outerArgs = arguments;
    return function () {
        _.spread(outerArgs[0], 1)(outerArgs);
    }
}
function defer(f) {
    return function () {
        let outerArgs = arguments;
        return function () {
            _.spread(f)(outerArgs);
        }
    }
}
function removeRoutes(router) {
    return function (routeNames) {
        routeNames = Array.isArray(routeNames) ? routeNames : [routeNames];
        router.route && removeRoutes(router.route)(routeNames);
        router.stack && removeHandlersFromStack(router.stack, routeNames);

    };
    function removeHandlersFromStack(stack, routeNames) {
        routeNames = Array.isArray(routeNames) ? routeNames : [routeNames];
        _.each(stack, function (stackItem) {
            if (!_.find(routeNames, stackItem.handle.name)) {
                return;
            }
            _.remove(stack, stackItem);
        })
    }
}
function rmDir(path) {
    if (!fs.existsSync(path)) {
        return;
    }
    _.each(fs.readdirSync(path), (file, index) => {
        let curPath = path + "/" + file;
        if (fs.lstatSync(curPath).isDirectory())
            return rmDir(curPath);

        fs.unlinkSync(curPath);
    });
    fs.rmdirSync(path);
}

module.exports = {chain, defer, removeRoutes, rmDir};