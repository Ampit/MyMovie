const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// How to make use of Google Strategy
// it ceates a new instance of Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //we already have a record
          // null means no error here
          done(null, existingUser);
        } else {
          // we dont have a record, so create a record
          console.log(profile.name.givenName);
          new User({ googleId: profile.id, name: profile.name.givenName })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);
