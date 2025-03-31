import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer;

export const setSocketServerInstance = (serverInstance: SocketIOServer) => {
  io = serverInstance;
};

export const getSocketServerInstance = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.io instance not initialized.');
  }
  return io;
};
