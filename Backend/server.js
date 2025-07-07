const http = require('http');
const app = require('./index'); // 👈 Express app
const port = process.env.PORT || 3000;
const { initializeSocket } = require('./socket');

const server = http.createServer(app); // 👈 Create HTTP server from Express app

initializeSocket(server); // 👈 Pass server to socket initializer

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
