let Sequelize = require('sequelize');
module.exports = function (sequelize) {
    return sequelize.define('events', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        start: {
            type: Sequelize.DATE
        },
        end: {
            type: Sequelize.DATE
        }
    }, {timestamps: false});
};