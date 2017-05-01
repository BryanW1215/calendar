let express = require('express'),
    router = express.Router(),
    base = require('./base'),
    {json} = require('../../../shared/return');

base(router, 'users');
router.get('/:id/events', function (req, res, next) {
    json(res)(req.data);
});
module.exports = router;