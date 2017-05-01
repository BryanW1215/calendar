let express = require('express'),
    router = express.Router(),
    base = require('./base'),
    session = require('../../../services/session'),
    {error} = require('../../../shared/return'),
    {removeRoutes} = require('../../../shared/utilities');

base(router, 'users');

router.get('/:id/events', session.isAuthenticated, function (req, res, next) {
    if (!req.params.id)
        return error.InvalidRequest(res);

    next();
});
router.get('/').use(session.isDebug);
// Accounts may only be created via google login.
removeRoutes('basicPost');

module.exports = router;