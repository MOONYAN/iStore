var { storeDB, storeSecret, storePath } = require('./config/storeConfig').store,
    { istoreSecret } = require('./config/storeConfig').istore,
    express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors');

var mongoose = require('mongoose'),
    connection = mongoose.connect(storeDB),
    autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;
autoIncrement.initialize(connection);

var expressJwt = require('express-jwt'),
    user = require('./helpers/accessControl');

var userRouter = require('./routers/userRouter'),
    accountRouter = require('./routers/accountRouter'),
    productRouter = require('./routers/productRouter'),
    linePushRouter = require('./routers/lineRouter');

require('./libs/lineRobot');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ exposedHeaders: 'Authorization' }));

app.use(user.middleware());

app.use(`${storePath}/public`, express.static('public'));

app.all('*', expressJwt({ secret: storeSecret })
    .unless({
        path: [
            { url: `${storePath}/account/login` },
            { url: `${storePath}/account`, methods: ['POST'] }]
    }), function (req, res, next) {
        next();
    });

app.post(`${storePath}/account$|${storePath}/account/login`, expressJwt({secret: istoreSecret}), function (req, res, next) {
    next();
});

app.use(`${storePath}/account`, accountRouter);
app.use(`${storePath}/product`, productRouter);
app.use(`${storePath}/line`, linePushRouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: 'Service Not Found' });
});

module.exports = app;