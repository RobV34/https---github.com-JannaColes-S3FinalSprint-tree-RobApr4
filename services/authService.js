const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./userModel");



passport.use(
  new LocalStrategy(function (username, password, done) {
    // Implementation to find a user by username
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      // Compare password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          // Add a check for isAdmin attribute
          if (user.isAdmin) {
            // If it's an admin login attempt
            return done(null, user, { message: "Admin logged in." });
          } else {
            // If it's a regular user login attempt
            return done(null, user, { message: "User logged in." });
          }
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // Implementation to find a user by ID
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
