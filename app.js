import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import Acl from 'acl';
import http from 'http';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {serverPort, db} from './config.json';
import passport from './helpers/authentication/Auth';
import users from './routes/users';
import roles from './routes/roles';
import testimonials from './routes/testimonials';
import initializeACL from './helpers/InitializeACL';

const app = express();
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/view'));
app.use(cookieParser());

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

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB || `mongodb://${db.host}:${db.port}/${db.name}`, {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
});
// mongoose.connect(`mongodb://Yaroslaw:19981798@ds119060.mlab.com:19060/solv-express`, {useMongoClient: true});

mongoose.connection.on('connected', function () {

    let myAcl = new Acl(new Acl.mongodbBackend(mongoose.connection.db));

    app.use('/testimonials', testimonials(myAcl));
    app.use('/users', users(myAcl));
    app.use('/roles', roles(myAcl));

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/view/index.html');
    });

    if (app.enabled('FIRST_RUN')) {
        app.disable('FIRST_RUN');
        initializeACL(myAcl);
        console.log("### Server starting and configuring! ###");
    }

});

// app.get('/open', function (req, res, next) {
//     mongoose.connect(process.env.DB || `mongodb://${db.host}:${db.port}/${db.name}`, {useMongoClient: true});
//     next();
// });
//
// app.get('/close', function (req, res, next) {
//     mongoose.connection.close();
//     next();
// });

mongoose.connection.on('open', function () {
    console.log('*** Mongoose connection open ***');
});

mongoose.connection.on('close', function () {
    console.log('*** Mongoose connection close ***');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});

const server = http.createServer(app).listen(process.env.PORT || serverPort, () => app.enable('FIRST_RUN'));

// server.on('connection', (socket) => {
//
//     console.log('### Connecton established ###', '\n', '\n');
//
//     socket.on('data', (data) => {
//         console.log(data.toString('utf8'));
//     });
//
//     socket.on('close', () => {
//         console.log('### Connection closed ###');
//     });
//
// });

module.exports = app;
