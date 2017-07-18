const express = require('express');

const ChatController = require('../controllers/chatController');

const router = express.Router();

router.route('/')
  /** GET /api/chat - Get list of chat */
  .get(ChatController.list)

  /** POST /api/chat - Creates new chat */
  .post(ChatController.startChat)

  /** PUT /api/chat - Adds new message to chat */
  .put(ChatController.addMessageToChat)

  /** DELET /api/chat - Deletes all chats */
  .delete(ChatController.removeAll);

router.route('/:username')
  /** GET /api/chat/username - Get list of users chats */
  .get(ChatController.getUsersConversation);

router.route('/:username/:chatId')
  /** DELETE /api/chat/username - Deletes chat with sepecifiend id */
  .delete(ChatController.removeChat)

module.exports = router;
