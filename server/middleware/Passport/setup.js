import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../../models/user.js";
import bcrypt from "bcryptjs";

// ===================== Strategy =================== //
passport.use(
  'local-login',
  new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    console.log('In LocalStrategy');
    User.findOne({ email: username })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        console.log(user);
        console.log(password);

        bcrypt.compare(password, user.password).then((res) => {
          if (res) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      })
      .catch((err) => {
        done(err);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

export default passport;