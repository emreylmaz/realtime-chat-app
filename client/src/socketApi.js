import io from 'socket.io-client';

let socket;

export const init = () => {
    console.log('Connecting to socket...');
  socket = io('http://localhost:3001',{
      transports: ['websocket']
  });
  socket.on('connect', () => {
      console.log('Connected to socket');
  })
}

export const sendMessage = (message) => {
    if (socket)  socket.emit('new-message', message);
}

export const subscribeChat = (cb) => {
    if (!socket) return;
    socket.on('receive-message', (message) => {
        console.log('New message: ', message);
        cb(message);
    })
}

export const subscribeInitialMessages = (cb) => {
    if (!socket) return;
    socket.on('message-list', (message) => {
        console.log('initial: ', message);
        cb(message);
    })
}