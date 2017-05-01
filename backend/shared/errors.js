let _ = require('lodash'),
    {defer} = require('./utilities');

let errors = [];
let error = function (res, code, message) {
    let error = _.clone(_.find(errors, {code: code}));
    error.message = message || error.message;
    res.json({success: false, error});
    res.end();
};

let add = function (err) {
    errors.push(err);
    return errorF(err)
};

function errorF(err) {
    return (res, message) => error(res, err.code, message || err.message)
}
//Building error object like this for IDE intellisense and code checking.
error.defer = defer(error);
error.defer.InvalidRequest = defer(error.InvalidRequest = add({code: 1, message: "Invalid request."}));
error.defer.Unauthenticated = defer(error.Unauthenticated = add({code: 2, message: "Not logged in."}));
error.defer.Unauthorized = defer(error.Unauthorized = add({code: 3, message: "Unauthorized."}));
error.defer.NotFound = defer(error.NotFound = add({code: 4, message: "Not found."}));
error.defer.DB = defer(error.DBError = add({code: 5, message: "A database error occurred."}));
error.defer.Validation = defer(error.Validation = add({code: 6, message: "Validation error."}));
error.defer.Authentication = defer(error.Authentication = add({code: 7, message: "Authentication error."}));
error.defer.Server = defer(error.Server = add({code: 500, message: "Server error occurred."}));

module.exports = error;


