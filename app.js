import express from 'express';
import session from 'express-session';

const MongoStore = require('connect-mongo')(session);

import passport from './helpers/auth';
import cookieParser from 'cookie-parser';
import http from 'http';
import bodyParser from 'body-parser';
import {serverPort} from './config.json';
import {mongooseConnection} from './helpers/DataBaseUtils';

const app = express();

import testimonials from './routes/testimonials';
import users from './routes/users';

app.use(express.static(__dirname + '/src')); // приводит в формат json перед всеми обработчиками

app.use(cookieParser())
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

app.use('/testimonials', testimonials);
app.use('/users', users);
app.use('/', users);
http.createServer(app).listen(serverPort);

module.exports = app;
