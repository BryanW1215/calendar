let {error} = require('../../../shared/return'),
    session = require('../../../services/session');

module.exports = function (router, collection) {
    // Only authenticated users may make api requests
    // Putting this here instead of in the authorization step
    // as catching them early on will mitigate the impact of a DOS attack.
    router.route('/').all(session.isAuthenticated);
    router.route('/:id').all(session.isAuthenticated);

    router.route('/')
        .get(function baseGet(req, res, next) {
            next();
        })
        .post(function basePost(req, res, next) {
            if (!Object.keys(req.body).length)
                return error.InvalidRequest(res);

            next();
        });

    router.route('/:id')
        .get(function baseGetById(req, res, next) {
            if (!req.params.id)
                return error.InvalidRequest(res);

            next();
        })
        .put(function basePut(req, res, next) {
            if (!req.params.id || !Object.keys(req.body).length)
                return error.InvalidRequest(res);

            next();
        })
        .delete(function baseDelete(req, res, next) {
            if(!req.params.id)
                return error.InvalidRequest(res);
            next();
        });

};