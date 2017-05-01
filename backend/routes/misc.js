
let express = require('express'),
    session = require('../services/session'),
    accounts = require('../services/accounts'),
    router = express.Router(),
    _ = require('lodash'),
    {error, json} = require('../shared/return');

router.post('/images/userpics', session.isAuthenticated, async function (req, res, next) {
    let files = _.values(req.files);
    if(files.length !==1){
        return error.InvalidRequest(res);
    }
    try {
        await accounts.set.UserPic(req.user.id, files[0]);
    }
    catch (ex){
        return error.Server(res, ex.message);
    }
    json(res)(urls.userPics + req.user.id + '.jpg');
});



module.exports = router;

