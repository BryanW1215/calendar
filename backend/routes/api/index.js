let express = require('express'),
    router = express.Router(),
    config = require('config'),
    path = require('path'),
    _ = require('lodash'),
    fs = require('fs');

let collections = config.get('sequelize.collections'),
    requestSteps = ['a-request-validation', 'b-get-data', 'c-authorization', 'd-action', 'e-response'];

function buildRouterFromBase(step, collection){
    let base = require(path.join(__dirname, step, 'base'));
    let router = express.Router();
    base(router, collection);
    return router;
}

// build routes
_.each(collections, function (collection){
    _.each(requestSteps, function (step){
        let customRouterPath = path.join(__dirname, step, `${collection}.js` );
        // Going sync here since order matters
        if(fs.existsSync(customRouterPath)){
            // Collection has a custom router for this step.  Adding it to API router.
            return router.use(`/${collection}`, require(customRouterPath));
        }
        // No custom router exists create one from the base
        router.use(`/${collection}`, buildRouterFromBase(step, collection));
    });
});

module.exports = router;