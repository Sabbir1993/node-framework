const localStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

// load modal
const User = require('../app/models/User');

module.exports = function (passport) {
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            // match user
            User.findOne({ email: email })
                .populate({path: 'role'})
                .then( async (user) => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not valid!!!' });
                    }
                    // Match password
                    if (await bcrypt.compare(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password doesn\'t match!!!!' });
                    }
                })
                .catch(err => {
                    return done(null, false, { message: err.message });
                });
        }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id,(err, user)=>{
            done(err, user);
        });
    });
}
