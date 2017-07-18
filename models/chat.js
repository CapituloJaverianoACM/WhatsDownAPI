const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../models/user');

const MessageSchema = new Schema ({
  content: {
    type: String,
    required: true,
    default: ""
  },
  senderUsername: {
    type: String
  },
  chatId: {
    type: Schema.Types.ObjectId
  },
  typestamp: {
    type: Date,
    default: Date.now
  }
});

const ChatSchema = new Schema ({
  host: {
    type: String,
    require: true
  },
  recipient: {
    type: String,
    require: true
  },
  messages: {
    type: [MessageSchema],
    default: []
  }

});

module.exports = mongoose.model('Chat', ChatSchema);
