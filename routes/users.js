const express = require('express');

const UserController = require('../controllers/userController');

const router = express.Router();

router.route('/')
  /** GET /api/users - Get list of users */
  .get(UserController.list)

  /** DELETE /api/users - Remove all users */
  .delete(UserController.removeAll);

router.route('/register')
  /** POST /api/users/register - Create new user */
  .post(UserController.register);

router.route('/login')
  /** POST /api/users/login - Login new user and gives JWT */
  .post(UserController.login);

router.route('/:username')
  /** GET /api/users/:usernae - Finds user's information */
  .get(UserController.findUser);

router.route('/:username/contacts/')
  /** GET /api/users/:username/contacts - Lists all user's contacts */
  .get(UserController.listContacts);

router.route('/:username/contacts/:contactUsername')
  /**
    * PUT /api/users/:username/contacts/:newContact -
    * Adds a contact to the user
    */
  .put(UserController.addContact)

  /** DELETE /api/users/:username/contacts/:newContact - Removes contact */
  .delete(UserController.removeContact);

module.exports = router;
