/**
 * Configures all passport strategies for register users
 * and login.
 */

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const config = require('../config/config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
