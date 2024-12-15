const path = require('path');
const fs = require('fs');

const fastify = require('fastify');
const compress = require('@fastify/compress');
const statics = require('@fastify/static');

const port = process.env.PORT || '9090';
const host = process.env.HOST || 'localhost';

const app = fastify({
  logger: true,
  https: {
    allowHTTP1: true, // fallback support for HTTP1
    key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'localhost.pem'))
  }
});

app.register(compress);

app.register(statics, {
  root: path.join(__dirname, 'dist')
});

app.all('/', (req, reply) => {
  reply.sendFile('index.html');
});

app.all('/images-engine', (req, reply) => {
  reply.sendFile('index.html');
});

app.all('/rhythmic', (req, reply) => {
  reply.sendFile('index.html');
});

const start = async () => {
  try {
    await app.listen({ port, host });
    console.log(`Start at http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
