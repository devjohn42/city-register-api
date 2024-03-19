import express from 'express';

const server = express();

server.get('/', (_, res) => {
  return res.send('server running');
});

export { server };
