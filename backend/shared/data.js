let {error} = require('./return');
function load(req, res, next) {
    return function (p) {
        p.then(set(req, res, next)).catch(error.defer.DB(res));
    }
}

function execute(){} // intellisense
execute = load;

function set(req, res, next) {
    return function (data) {
        if (!data) {
            return error.NotFound(res);
        }
        req.data = data;
        next();
    };
}
function validatedSave(req, res, next) {
    req.data.validate().then((errors) => {
        if (!errors) {
            return execute(req, res, next)(req.data.save())
        }

        let errList = [];
        _.each(Object.keys(errors), (error) => {
            errList.push(`${error}: ${errors[error]}`);
        });
        let message = `The following validation errors occurred ${errList.join(", ")}.`;
        error.Validation(res, message);
    });
}
module.exports = {load, execute, set, validatedSave};