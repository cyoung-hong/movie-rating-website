import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";

// ===================== Strategy =================== //
passport.use(
  'local-login',
  new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    User.findOne({ email: username })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        bcrypt.compare(password, user.password).then((res) => {
          if (res) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      })
      .catch((err) => {
        console.log("Caught error.")
        done(err);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

export default passport;