var express = require('express');
var router = express.Router();

/**
 * Gets a welcome mesage from the API.
 */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to WhatsDown API!' });
});

module.exports = router;
