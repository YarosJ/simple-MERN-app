const debugSocket = require('debug')('socket');

/**
 * Indicates the state of socket
 * @param server
 */

export default (server) => {
  server.on('connection', (socket) => {
    debugSocket('Connecton established', '\n');

    socket.on('data', (data) => {
      debugSocket(data.toString('utf8'));
    });

    socket.on('close', () => {
      debugSocket('Connection closed', '\n');
    });
  });
};
