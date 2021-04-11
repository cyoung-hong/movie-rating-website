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
        bcrypt.compare(password, user.password).then((res) => {
          if (res) {
            const resUser = {
              _id: res._id,
              recommendations: res.recommendations,
              email: res.email,
              name: res.name,
            }
            return done(null, resUser);
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
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById(_id, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

export default passport;