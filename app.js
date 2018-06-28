import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Acl from 'acl';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { serverPort, db } from './config.json';
import passport from './helpers/authentication/Auth';
import users from './routes/users';
import roles from './routes/roles';
import testimonials from './routes/testimonials';
import initializeACL from './helpers/InitializeACL';

const app = express();
const MongoStore = require('connect-mongo')(session);
const debugApp = require('debug')('app');
const debugSocket = require('debug')('socket');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/view')));
app.use(cookieParser());

app.use(session({
  secret: 'rbvuhbrfhjce',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000,
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB || `mongodb://${db.host}:${db.port}/${db.name}`, {
  useMongoClient: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
});

mongoose.connection.on('connected', () => {
  const myAcl = new Acl(new Acl.mongodbBackend(mongoose.connection.db));

  app.use('/testimonials', testimonials(myAcl));
  app.use('/users', users(myAcl));
  app.use('/roles', roles(myAcl));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '//view/index.html'));
  });

  if (process.env.seedDB) {
    initializeACL(myAcl);
    debugApp('Server starting and configuring!');
  }
});

mongoose.connection.on('open', () => {
  debugApp('Mongoose connection open');
});

mongoose.connection.on('close', () => {
  debugApp('Mongoose connection close');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debugApp('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

const server = http.createServer(app).listen(process.env.PORT || serverPort, () => app.enable('FIRST_RUN'));

server.on('connection', (socket) => {
  debugSocket('Connecton established', '\n');

  socket.on('data', (data) => {
    debugSocket(data.toString('utf8'));
  });

  socket.on('close', () => {
    debugSocket('Connection closed', '\n');
  });
});

module.exports = app;
