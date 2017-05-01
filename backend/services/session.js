let accounts = require('./accounts'),
    Sessions = {},
    config = require('config'),
    _ = require('lodash');

let self = {},
    hidden = {},
    sessionExpiration = config.get('server.sessionExpiration'),
    currentExpiration = 0,
    currentTime = 0;

hidden.setCurrentExpiration = function () {
    currentTime = (new Date()).valueOf();
    currentExpiration = (new Date()).valueOf() + sessionExpiration * 60000;
};
hidden.setCurrentExpiration();
setInterval(hidden.setCurrentExpiration, 60000);

self.login = async function (model) {
    let required = ['token', 'first_name', 'last_name', 'picture', 'email'];
    let isValid = true;
    _.each(required, (requiredProperty) => {
       isValid = isValid && model[requiredProperty];
    });
    if (!isValid) {
        throw "Required property is missing"
    }
    let account = await accounts.login(model);

    Sessions[account.id] = account;
    return account;
};
self.logout = function (AccountID) {
    accounts.token.clear(AccountID);
    delete Sessions[AccountID];
};
self.attach = function (app) {
    app.use('*', async function (req, res, next) {
        if (req.method === "OPTIONS") {
            return next()
        }

        let token = req.headers.token,
            accountID = req.headers['account-id'];
        accountID = accountID ? parseInt(accountID) : undefined;
        if (!token || !accountID) {
            return next();
        }
        let session = Sessions[accountID];
        if (session) {
            if (session.token === token) {
                if (session.expiration < currentTime){
                    delete Sessions[session.accountID];
                    self.logout(session.accountID);
                    return next();
                }
                session.expiration = currentExpiration;
                req.user = session;
                return next();
            }
            self.logout(accountID);
            return next();
        }
        let tokenValid = await accounts.token.validate(accountID, token);
        if (!tokenValid) {
            return next();
        }
        let account = await accounts.get.AccountObject(accountID);
        req.user = Sessions[accountID] = account;
        next();
    });
};
self.isAuthenticated = function (req, res, next) {
    if (!req.user) {
        res.sendStatus(401);
        return res.end();
    }
    next();
};
self.isDebug = function (req, res, next) {
    if(process.env.NODE_ENV === 'production'){
        res.sendStatus(401);
        res.end();
    }
    next();
};
self.isAdmin = function (req, res, next) {
  if(!req.user.isAdmin){
      res.sendStatus(401);
      res.end();
  }
  next();
};
module.exports = self;