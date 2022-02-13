import { io } from "socket.io-client";

let socket;

export const initiateSocketConnection = () => {
  socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
  console.log(`Connecting socket...`);
};
