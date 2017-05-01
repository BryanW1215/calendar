function clearPrimaryKey(req, res, next){
    // Users may not hack the system by overriding or setting the entities primary key in the JSON request
    req.body.id && delete req.body.id;
    next();
}
module.exports = function (router, collection) {

    router.route('/').post(clearPrimaryKey);
    router.route('/:id').put(clearPrimaryKey);

};

