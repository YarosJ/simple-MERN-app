const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

import User from '../../models/User';

passport.serializeUser(function (user, done) {
    done(null, {_id: user.id, email: user.email}); //, rights: user.rights
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

export default passport.use(new LocalStrategy(
    { usernameField: 'email'},
    function (email, password, done) {
        User.findOne({ email: email}, function (err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!user) {
                console.log("!user");
                return done(null, false, {message: 'Incorrect email.'});
            }
            if (!user.validPassword(password)) {
                console.log("!password");
                return done(null, false, {message: 'Incorrect password.'});
            }
            if (user && !user.validPassword(password)) {
                console.log("user && !password");
                return done("Redirect to enter password");
            }
            console.log("done");
            return done(null, user);
        });
    }
));