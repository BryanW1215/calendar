let {execute, validatedSave} = require('../../../shared/data');


module.exports = function (router, collection) {
    router.route('/')
        .post(function (req, res, next) {
            req.data = db[collection].build(req.body);
            validatedSave(req, res, next);
        });

    router.route('/:id')
        .put(function (req, res, next) {
            req.data.set(req.body);
            validatedSave(req, res, next);

        })
        .delete(function (req, res, next) {
            execute(req, res, next)(req.data.destroy())
        });
};