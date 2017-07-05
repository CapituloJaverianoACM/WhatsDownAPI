const express = require('express');

const UserController = require('../controllers/userController');

const router = express.Router();

router.route('/')
  /** GET /api/users - Get list of users */
  .get(UserController.list)

  /** POST /api/users - Create new user */
  .post(UserController.create)

  /** DELETE /api/users - Remove all users */
  .delete(UserController.removeAll);

module.exports = router;
