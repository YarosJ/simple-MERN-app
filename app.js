import express from 'express';
import session from 'express-session';

const MongoStore = require('connect-mongo')(session);

import passport from './helpers/authentication/auth';
import cookieParser from 'cookie-parser';
import http from 'http';
import bodyParser from 'body-parser';
import {serverPort} from './config.json';
import {mongooseConnection} from './helpers/DataBaseUtils';

const app = express();

import testimonials from './routes/testimonials';
import users from './routes/users';
import * as db from "./helpers/DataBaseUtils";
import authenticationMiddleware from "./helpers/authentication/authenticationMiddleware";

app.use(express.static(__dirname + '/src'));

app.use(cookieParser());

db.setUpConnection();

app.use(session({
    secret: 'rbvuhbrfhjce',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 2419200000
    },
    store: new MongoStore({
        mongooseConnection: mongooseConnection
    })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/testimonials', authenticationMiddleware(), testimonials);
app.use('/users', authenticationMiddleware(), users);
app.use('/', authenticationMiddleware(), users);

http.createServer(app).listen(process.env.PORT || serverPort);

module.exports = app;
