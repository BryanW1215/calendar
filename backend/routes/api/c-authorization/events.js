
let express = require('express'),
    router = express.Router(),
    base = require('./base'),
    {error} = require('../../../shared/return');


base(router, 'events');

router.route('/')
    .post(function (req, res, next) {
        // Users may only create events for their own calendar
        if (req.user.id !== req.body.user_id) {
            return error.Unauthorized(res);
        }
        next();
    });

router.route('/:id')
    .put(function (req, res, next) {
        // Users may only update their own events
        if (req.data.user_id !== req.user.id) {
            return error.Unauthorized(res);
        }
        next();
    })
    .delete(function (req, res, next) {
        // Users may only delete their own events
        if (req.data.user_id !== req.user.id) {
            return error.Unauthorized(res);
        }
        next();
    });

module.exports = router;