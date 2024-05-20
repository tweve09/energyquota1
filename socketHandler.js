const socketIO = require('socket.io');

let io;

function initializeSocket(server) {
  io = socketIO(server);
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (tenant_id)=>{
        socket.join(tenant_id);
        console.log(`Joined room ${tenant_id}`);
    });
    
  });
}

function getSocketIO() {
  if (!io) {
    throw new Error('Socket.io has not been initialized.');
  }
  return io;
}

module.exports = { initializeSocket, getSocketIO };

