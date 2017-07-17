function healthCheck(req, res, err) {
  res.json({ message: 'Welcome to WhatsDown Chat API!' });
}


/**
  * Opens the socket to receive and send messages.
  */
function iochat(io) {
  // start listen with socket.io
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
      console.log(msg);
      let data = {
        message: msg.message,
        username:msg.username,
        date: Date.now()
      };
      io.emit('message', data);
    });
  });
}

module.exports = {
  healthCheck,
  iochat
}
