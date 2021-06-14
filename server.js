const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

const rooms = new Map();

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

io.on('connection', socket => {
  console.log('Socket connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
 });
});

const PORT = 9999;

server.listen(PORT, (err) => {
  if(err) throw Error(err);
  console.log(`Server http://localhost:${PORT}/ connect...`);
});