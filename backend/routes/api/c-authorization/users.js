let express = require('express'),
    router = express.Router(),
    base = require('./base'),
    _ = require('lodash'),
    {error} = require('../../../shared/return');


base(router, 'users');

router.route('/')
    .post(function (req, res, next) {
        // User accounts may only be created through google login
        return error.Unauthorized(res);
    });

router.route('/:id')
    .put(function (req, res, next) {
        // Users may not set the admin flag unless they are an admin
        if (!req.user.isAdmin && req.body.isAdmin) {
            return error.Unauthorized(res);
        }
        // Users may only edit their own account unless they are an admin
        if (req.user.id !== req.params.id || !req.user.isAdmin) {
            return error.Unauthorized(res);
        }
        next();
    })
    .delete(function (req, res, next) {
        // Users may only delete their own account unless they are an admin
        if (req.user.id !== req.params.id || req.user.isAdmin) {
            return error.Unauthorized(res);
        }
        next();

    });

module.exports = router;