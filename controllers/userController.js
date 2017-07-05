const User = require('../models/user');

function list(req, res, next) {
  User.find({}, (err, query) => {
    if (err) next(err);
    res.json(query);
  });
}

/**
 * Create new user
 * @returns {User}
 */
function create(req, res, next) {
  User.create(req.body, (err, newObject) => {
    if(err) next(err);
    let userId = newObject._id;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Created user with id ' + userId);
  });
}

/**
 * Deletes all users.
 * @returns {Object} mongoose response
 */
function removeAll(req, res, next) {
  User.remove({}, (err, response) => {
    if(err) next(err);
    res.json(response);
  })
}

module.exports = { list, create, removeAll};
