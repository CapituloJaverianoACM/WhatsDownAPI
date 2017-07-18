const Chat = require('../models/chat');

/**
  * Opens the socket to receive and send messages.
  */
function iochat(io) {
  // start listen with socket.io
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
      io.emit('message', msg);
    });
    socket.on('disconnect', ()=> {
      console.log('user disconnected');
    });
  });
}

/**
  * Lists all the cahts in the database.
  * @returns {JSON}
  */
function list(req, res, next) {
  Chat.find({}, (err, query) => {
    if (err) next(err);
    res.json(query);
  });
}

/**
  * Creates a new chat with the host and recipient sent
  * in the JSON object.
  * @returns {JSON}
  */
function startChat(req, res, next) {
  console.log("Body", req.body);
  Chat.create(req.body, (err, newChat) => {
    console.log("New Chat", newChat);
    if(err) next(err);
    // res.writeHead(200, {
    //   'Content-Type': 'text/plain'
    // });
    return res.status(200).json(newChat);
  });
}

/**
  * Adds a new message to the conversation with the id specifiend in the
  * request and adds the message specifiend in the request.
  */
function addMessageToChat(req, res, next) {
  Chat.findById(req.body.chatId, (err, chatFound) => {
    chatFound.messages.push(req.body.newMessage);
    chatFound.save((err, modifiedChat) => {
      if(err) next(err);
      res.json(modifiedChat);
    });
  });
}

/**
 * Deletes all chats.
 * @returns {Object} mongoose response
 */
function removeAll(req, res, next) {
  Chat.remove({}, (err, response) => {
    if(err) next(err);
    res.json(response);
  });
}

/**
 * Get's all the conversations in witch the user is the
 * host or a recipient.
 * @returns {JSON}
 */
function getUsersConversation(req, res, next) {
  let currentUsername = req.params.username;
  let queryList = [{host: currentUsername}, {recipient: currentUsername}];
  Chat.find({ $or : queryList }, (err, query) => {
    if(err) next(err);
    res.json(query);
  });
}

/**
  * Remove chat with the specified id.
  */
function removeChat(req, res, next) {
  console.log("Id: ", req.params.chatId);
  Chat.findByIdAndRemove(req.params.chatId, (err, response) => {
    if(err) next(err);
    res.json(response);
  });
}

module.exports = {
  iochat,
  list,
  startChat,
  addMessageToChat,
  getUsersConversation,
  removeChat,
  removeAll
}
