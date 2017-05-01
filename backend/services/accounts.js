let _ = require('lodash'),
    config = require('config'),
    googleAuth = require('./google.auth'),
    jimp = require('jimp'),
    path = require('path'),
    fs = require('fs');

module.exports = new function () {
    let self = this;

    self.login = async function (model) {
        if (!googleAuth.verifyAccessToken(model.email, model.token)) {
            throw "Google access token isn't valid";
        }
        let account = await db.users.findOne({where: {email: {$eq: model.email}}});
        account = account || db.users.build(model);

        account.set(model);
        await account.save();

        return self.get.AccountObject(account);
    };
    self.get = {};
    self.get.AccountObject = async function (model) {
        if (!_.isObject(model)) {
            model = await self.get.byAccountID(model);
        }
        model = model.get({plain: true});
        model.hasCustomPicture && (model.picture = urls.userPics + model.id + '.jpg');
        return model
    };
    self.get.byAccountID = async function (AccountID) {
        return db.users.findById(AccountID);
    };
    self.token = {
        validate: async function (AccountID, token) {
            let account = await db.users.findById(AccountID);
            return account.token === token;
        },
        clear: async function (AccountID) {
            let account = await db.users.findById(AccountID);
            account.set({token: ''});
            return await account.save();
        }
    };
    self.set = {};
    self.set.UserPic = async function (accountId, file) {

        let target = directories.userPics + path.sep + accountId + '.jpg';
        if (fs.existsSync(target)) {
            fs.unlink(target);
        }
        await jimp.read(file.data).then(instance => instance.cover(63, 63).write(target));

        let account = await self.get.byAccountID(accountId);
        account.hasCustomPicture = true;
        await account.save();
    };
    return self;
};
