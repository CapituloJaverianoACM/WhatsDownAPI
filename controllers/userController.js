const passport = require('passport');

const User = require('../models/user');
const Verify = require('./verifyController');

function list(req, res, next) {
  User.find({}, (err, query) => {
    if (err) next(err);
    res.json(query);
  });
}

/**
 * Create new user
 * @returns {JSON}
 */
function register(req, res, next) {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    mobileNumber: req.body.mobileNumber
   });
  User.register(newUser, req.body.password, (err, user) => {
    if(err) return res.status(500).json({error: err});
    passport.authenticate('local')(req, res, () => {
      return res.status(200).json({status: 'Registration Successful!'});
    });
  });
}

/**
 * Uses passport to authenticate a login request form
 * a user.
 * @returns {JSON}
 */
function login(req, res, next) {
  console.log('Login Function');
  passport.authenticate('local',(err, user, info) => {
    if(err) return next(err);
    if(!user) {
      return res.status(401).json({
        error: info,
        success: false
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          error: 'Could not log in user',
          success: false
        });
      }

      let token = Verify.getToken(user);

      if(user.admin === true) {
        res.status(200).json({
          status: 'Login successful as Admin!',
          success: true,
          token: token
        });
      } else {
        res.status(200).json({
          status: 'Login successful!',
          success: true,
          token: token
        });
      }
    });
  })(req, res, next);
}

/**
 * Deletes all users.
 * @returns {Object} mongoose response
 */
function removeAll(req, res, next) {
  User.remove({}, (err, response) => {
    if(err) next(err);
    res.json(response);
  });
}

/**
  * Returns user's information.
  * @return {JSON} user query.
  */
function findUser(req, res, next) {
  User.findOne({'username': req.params.username}, (err, query) => {
    if(err) next(err);
    res.json(query);
  });
}

module.exports = { list, register, login, removeAll, findUser};
