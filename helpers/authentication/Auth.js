import User from '../../models/User';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const debugPassport = require('debug')('auth');

passport.serializeUser((user, done) => {
  done(null, { _id: user.id, email: user.email });
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Configure passport for local strategy
 */

export default passport.use(new LocalStrategy(
  { usernameField: 'email' },
  ((email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        debugPassport(err);
        return done(err);
      }

      if (!user) return done(null, false, { message: 'Incorrect email.' });
      if (!user.validPassword(password)) return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    });
  }),
));
