const socketIO = require('socket.io');

let io;

function initializeSocket(server) {
  io = socketIO(server);
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (userId)=>{
        socket.join(userId);
        console.log(`Joined room ${userId}`);
    })
    
  });
}

function getSocketIO() {
  if (!io) {
    throw new Error('Socket.io has not been initialized.');
  }
  return io;
}

module.exports = { initializeSocket, getSocketIO };
