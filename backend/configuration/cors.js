module.exports = function (app) {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,UPDATE,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token,account-id,enctype');
        res.setHeader('Access-Control-Allow-Credentials', true);
        if(req.method==="OPTIONS"){
            res.sendStatus(200);
            return res.end();
        }
        next();
    });
};