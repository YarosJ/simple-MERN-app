const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

import User from '../../models/User';

passport.serializeUser(function (user, done) {
    done(null, {_id: user.id, email: user.email});
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

export default passport.use(new LocalStrategy(
    {usernameField: 'email'},
    function (email, password, done) {
        User.findOne({email: email}, function (err, user) {

            if (err)
                return done(err);

            if (!user)
                return done(null, false, {message: 'Incorrect email.'});

            if (!user.validPassword(password))
                return done(null, false, {message: 'Incorrect password.'});

            return done(null, user);
        });
    }
));