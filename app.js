import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Acl from 'acl';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import initializeACL from './helpers/SeedACL';
import debugSocket from './config/debugSocket';
import mongooseConnect from './config/mongooseConnect';
import indexRoute from './routes/indexRoute';
import initializePassport from './config/initializePassport';
import { serverPort } from './config.json';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/view')));
app.use(cookieParser());

initializePassport(app, mongoose);

mongooseConnect(mongoose, process, () => {
  const myAcl = new Acl(new Acl.mongodbBackend(mongoose.connection.db));
  indexRoute(app, myAcl);
  if (process.env.seedDB) initializeACL(myAcl);
});

const server = http.createServer(app).listen(process.env.PORT || serverPort);

debugSocket(server);

module.exports = app;
