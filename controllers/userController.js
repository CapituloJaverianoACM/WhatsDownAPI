const passport = require('passport');

const User = require('../models/user');
const Verify = require('./verifyController');

const errorObject = {
  error: {
    name: 'UserNotFound',
    message: 'User not found.'
  }
};

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
    if(query === null) {
      return res.status(404).json(errorObject);
    }
    res.json(query);
  });
}

/**
  * Looks for the user and lists all it's contacts.
  * @return {JSON} array of contacts.
  */
function listContacts(req, res, next) {
  User.findOne({'username': req.params.username}, (err, query) => {
    if(err) next(err);
    if(query === null) {
      return res.status(404).json(errorObject);
    }
    res.json(query.contacts);
  });
}

/**
  * Check if user exists and if it does is added to the contacts
  * array.
  * @return {JSON} possible error or confirmation.
  */
function addContact(req, res, next) {
  let newContactUsername = req.params.contactUsername;
  let currentUsername = req.params.username;

  User.findOne({'username': newContactUsername}, (err, newContact) => {
    if(err) next(err);
    if(newContact === null) {
      return res.status(404).json(errorObject);
    }
    User.findOne({'username': currentUsername}, (err, currentUser) => {
      if(err) next(err);
      if(currentUser === null) {
        return res.status(404).json(errorObject);
      }
      currentUser.contacts.push(newContact);
      currentUser.save((err, modifiedUser) => {
        if(err) next(err);
        res.json(modifiedUser);
      });
    });
  });
}

function removeUserFromContactsList(contacts, usernameToDelete) {
  for(let i = 0; i < contacts.length; ++i) {
    if(contacts[i].username === usernameToDelete) {
      contacts.splice(i, 1);
    }
  }
  return contacts;
}

function removeContact(req, res, next) {
  let deleteContactUsername = req.params.contactUsername;
  let currentUsername = req.params.username;
  User.findOne({'username': currentUsername}, (err, currentUser) => {
    if(err) next(err);
    if(currentUser === null) {
      return res.status(404).json(errorObject);
    }
    currentUser.contacts = removeUserFromContactsList(
                            currentUser.contacts,
                            deleteContactUsername);
    currentUser.save((err, modifiedUser) => {
      if(err) next(err);
      res.json(modifiedUser);
    });
  });
}

module.exports = {
  list,
  register,
  login,
  removeAll,
  findUser,
  listContacts,
  addContact,
  removeContact
};
