function json (res, end){
    end = end !== false;
    return function (result){
        res.json({success: true, data: result});
        end && res.end();
    };
}
module.exports = {json, error: require('./errors')};
