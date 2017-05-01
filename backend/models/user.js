let Sequelize = require('sequelize');
module.exports = function (sequelize) {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        picture: {
            type: Sequelize.STRING
        },
        hasCustomPicture: {
            type: Sequelize.BOOLEAN,
            defaultValue: false

        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {timestamps: false});
};