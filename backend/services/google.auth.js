let _ = require('lodash'),
    rp = require('request-promise'),
    config = require('config');


module.exports = new function() {
    let self = this;
    let userInfoUrl = config.get('google.userInfoUrl');
    self.verifyAccessToken = function (email, accessToken) {
        let url = userInfoUrl + accessToken;
        return rp.get(url).then(parseResponse);
        async function parseResponse(response) {
        }
    };
    return self;
};


