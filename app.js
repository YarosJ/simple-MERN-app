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

/**
 * Creating application
 *
 * @type {*|Function}
 */

const app = express();

/**
 * Connecting middleware
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/view')));
app.use(cookieParser());

initializePassport(app, mongoose);

/**
 * Connecting mongoose, enabling router and initialize ACL
 */

mongooseConnect(mongoose, process, () => {
  const myAcl = new Acl(new Acl.mongodbBackend(mongoose.connection.db));
  indexRoute(app, myAcl);
  if (process.env.seedDB) initializeACL(myAcl);
});

/**
 * Start server on env port or default port (localhost)
 *
 * @type {*|{remove}|http.Server|Function}
 */

const server = http.createServer(app).listen(process.env.PORT || serverPort);

/**
 * Enabling debug socket
 */

debugSocket(server);

module.exports = app;
