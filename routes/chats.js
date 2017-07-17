const express = require('express');

const ChatController = require('../controllers/chatController');

const router = express.Router();

router.route('/')
  /** GET /api/users - Get list of users */
  .get(ChatController.healthCheck);

module.exports = router;
