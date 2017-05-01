let _ = require('lodash'),
    {load} = require('../../../shared/data');

module.exports = function (router, collection) {
    router.route('/')
        .get(function baseGet(req, res, next) {
            load(req, res, next)(db[collection].findAll());
        });

    router.route('/:id')
        .get(function baseGetById(req, res, next) {
            let include = req.query.include = !req.query.include ? [] : _.map(req.query.include.split(','), (collection) => db[collection]);
            load(req, res, next)(db[collection].findOne({where: {id: req.params.id}, include}))
        })
        .put(function (req, res, next) {
            load(req, res, next)(db[collection].findById(req.params.id))
        })
        .delete(function (req, res, next) {
            load(req, res, next)(db[collection].findById(req.params.id))
        });
};