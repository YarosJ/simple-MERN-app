import session from 'express-session';
import passport from '../helpers/authentication/Auth';

const MongoStore = require('connect-mongo')(session);

export default (app, mongoose) => {
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
};
