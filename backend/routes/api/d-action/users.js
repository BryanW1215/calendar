let express = require('express'),
    router = express.Router(),
    base = require('./base'),
    _ = require('lodash'),
    config = require('config');
base(router, 'users');

function censorUserData(user) {
    return {id: user.id, first_name: user.first_name, last_name: user.last_name.substr(0, 1), picture: user.picture, events: user.events};
}
function setPicture(user) {
    user.token = '';
    user.hasCustomPicture && (user.picture = urls.userPics + user.id + '.jpg')
}
router.route('/').get(function (req, res, next) {
    _.each(req.data, setPicture);
    if(!req.user.isAdmin){
        req.data = _.map(req.data, censorUserData);
    }
    next();
});

router.route('/:id').get(function (req, res, next){
    setPicture(req.data);
    if (req.user.id !== req.data.id || !req.user.isAdmin) {
        req.data = censorUserData(req.data);
    }
    next();
});
module.exports = router;