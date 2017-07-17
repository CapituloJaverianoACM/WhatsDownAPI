const express = require('express');

// APIs routes.
const userRoutes = require('./users');
const chatRoutes = require('./chats');

const router = express.Router();

/** GET / -  welcome mesage from the API */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to WhatsDown API!' });
});

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount chat routes at /chats
router.use('/chats', chatRoutes);

module.exports = router;
