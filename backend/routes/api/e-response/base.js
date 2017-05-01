let {json} = require('../../../shared/return');

module.exports = function (router, collection) {
    router.route('/')
        .get(function (req, res) {
            json(res)(req.data);
        })
        .post(function (req, res) {
            json(res)(req.data);
        });

    router.route('/:id')
        .get(function (req, res) {
            json(res)(req.data);
        })
        .put(function (req, res) {
            json(res)(req.data);
        })
        .delete(function (req, res) {
            json(res)(req.data);
        });
};