// routes/userlogin.js
const express = require('express');
const router = express.Router();
const passport = require('../services/authService');

// Display the user login form
router.get('/', (req, res) => {
  res.render('user-login', { message: req.flash('error') }); // Assuming you are using connect-flash for flash messages
});

// Handle the user login form submission
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/', // Redirect to home or another page on successful login
    failureRedirect: '/userlogin', // Redirect back to login page on failure
    failureFlash: true // Enable flash messages for login failure
  })(req, res, next);
});

module.exports = router;

