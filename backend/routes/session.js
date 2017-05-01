
let express = require('express'),
    router = express.Router(),
    session = require('../services/session'),
    {error, json} = require('../shared/return');


router.post('/login', async function (req, res, next) {
    try {
        let result = await session.login(req.body);
        json(res)(result);
    } catch (ex) {
        error.Authentication(res);
    }

});
router.post('/logout', session.isAuthenticated, async function (req, res, next) {
    try {
        await session.logout(req.user.id);
        json(res)({success: true});
    } catch (ex) {
        throw ex;
    }
    res.end();
});
module.exports = router;