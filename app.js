import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import Acl from 'acl';
import http from 'http';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {serverPort, db} from './config.json';
import passport from './helpers/authentication/Auth';
import authenticationMiddleware from "./helpers/authentication/AuthenticationMiddleware";
import users from './routes/users';
import roles from './routes/roles';
import testimonials from './routes/testimonials';

const app = express();
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/view'));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: 'rbvuhbrfhjce',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 2419200000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

mongoose.connect(process.env.DB || `mongodb://${db.host}:${db.port}/${db.name}`, {useMongoClient: true});
// mongoose.connect(`mongodb://Yaroslaw:19981798@ds119060.mlab.com:19060/solv-express`, {useMongoClient: true});

mongoose.connection.on('connected', function () {

    let myAcl = new Acl(new Acl.mongodbBackend(mongoose.connection.db));

    // app.all('*', authenticationMiddleware(myAcl));

    app.use('/testimonials', testimonials);
    app.use('/users', users(myAcl));
    app.use('/roles', roles(myAcl));

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/view/index.html');
    });

    app.get('/close', function (req, res, next) {
        mongoose.connection.close();
        next();
    });

    // app.use('/', users);
});

mongoose.connection.on('open', function () {
    console.log('*** Connection open ***');
});

mongoose.connection.on('close', function () {
    console.log('*** Connection close ***');
});

http.createServer(app).listen(process.env.PORT || serverPort);

module.exports = app;
