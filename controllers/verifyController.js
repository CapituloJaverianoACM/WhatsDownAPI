/**
 * A set of functions that helps verifying the user's roll, it
 * also manages the JSON Web Token.
*/

const User = require('../models/user');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../config/config');

/**
 * Signs in a user and returns the jwt. Also configures the
 * session expiration time.
 * @return {String} user's JasonWebToken.
 */

function getToken(user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600 // Time to expire token.
  });
}

module.exports = {getToken};
