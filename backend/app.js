async function run() {
    let express = require('express'),
        path = require('path'),
        favicon = require('serve-favicon'),
        bodyParser = require('body-parser'),
        fileUpload = require('express-fileupload'),
        http = require('http'),
        config = require('config'),
        dbConfig = require('./configuration/db'),
        {onListening, onError, FourOhFour, FiveHundred} = require('./shared/server');

    require('./configuration/setup')(true);

    let app = express();

    require('./configuration/cors')(app);
    require('./services/session').attach(app);

    app.use(fileUpload());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', require('./routes'));

    app.use(FourOhFour);
    app.use(FiveHundred);

    let server = http.createServer(app);
    let port = config.get('server.port');

    await dbConfig();
    server.listen(port);

    server.on('error', onError);
    server.on('listening', onListening);

    module.exports = app;
}
run();
