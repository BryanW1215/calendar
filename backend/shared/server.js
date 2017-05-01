function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            console.error('port requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('port already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
        console.log('Listening');
}
function FourOhFour (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    res.json({success: false, error: {code: 404, message: 'Route not found'}});
    next(err);
}
function FiveHundred (err, req, res, next) {
    if (res.headersSent || req.app.get('env') !== 'development') {
        return;
    }
    res.status(err.status || 500);
    res.json({success: false, error: {code: 500, error: err, message: err.message}});
}

module.exports = {onError, onListening, FourOhFour, FiveHundred};