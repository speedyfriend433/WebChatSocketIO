const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));

let chatHistory = [];

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.emit('chat history', chatHistory);

  socket.on('chat message', (msg) => {
    chatHistory.push(msg);
    if (chatHistory.length > 50) {  
      chatHistory.shift();
    }
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
