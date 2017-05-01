let path = require('path'),
    config = require('config'),
    Sequelize = require('sequelize');

let cfgSequelize = config.get('sequelize');

module.exports = function () {
    let storagePath = path.join(...[].concat(__dirname, cfgSequelize.storage));
    let sequelize = new Sequelize(`sqlite://${storagePath}`, {dialect: cfgSequelize.dialect, storage: storagePath});

    let db = global.db = {};
    db.users = require(path.join('..', 'models', 'user'))(sequelize);
    db.events = require(path.join('..', 'models', 'event'))(sequelize);

    db.users.hasMany(db.events, {foreignKey: 'user_id'});
    db.events.belongsTo(db.users, {foreignKey: 'user_id'});

    db.sequelize = sequelize;
    return sequelize.sync();
};
