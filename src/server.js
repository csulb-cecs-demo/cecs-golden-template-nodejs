'use strict';

const http = require('node:http');

const { mean, median } = require('./statistics');

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 3000;
const MAX_REQUEST_BYTES = 1_000_000;

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body),
  });
  response.end(body);
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    let bodyBytes = 0;

    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      bodyBytes += Buffer.byteLength(chunk);
      if (bodyBytes > MAX_REQUEST_BYTES) {
        const error = new Error('request body is too large');
        error.code = 'PAYLOAD_TOO_LARGE';
        reject(error);
        request.destroy();
        return;
      }
      body += chunk;
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        const error = new Error('request body must be valid JSON');
        error.code = 'INVALID_JSON';
        reject(error);
      }
    });
    request.on('error', reject);
  });
}

function validateTenIntegers(data) {
  if (
    !Array.isArray(data) ||
    data.length !== 10 ||
    !data.every((value) => Number.isInteger(value))
  ) {
    throw new Error('data must contain exactly 10 integers');
  }
}

function createServer() {
  return http.createServer(async (request, response) => {
    try {
      if (request.method === 'GET' && request.url === '/') {
        sendJson(response, 200, {
          service: 'golden-template-node',
          endpoints: ['GET /health', 'POST /statistics'],
        });
        return;
      }

      if (request.method === 'GET' && request.url === '/health') {
        sendJson(response, 200, { status: 'ok' });
        return;
      }

      if (request.method === 'POST' && request.url === '/statistics') {
        const payload = await readJson(request);
        validateTenIntegers(payload && payload.data);
        sendJson(response, 200, {
          mean: mean(payload.data),
          median: median(payload.data),
        });
        return;
      }

      sendJson(response, 404, { error: 'not found', path: request.url });
    } catch (error) {
      if (response.headersSent) {
        response.destroy(error);
        return;
      }

      const statusCode = error.code === 'PAYLOAD_TOO_LARGE' ? 413 : 400;
      sendJson(response, statusCode, { error: error.message });
    }
  });
}

function startServer({ host = process.env.HOST || DEFAULT_HOST, port = Number(process.env.PORT) || DEFAULT_PORT } = {}) {
  const server = createServer();
  server.listen(port, host, () => {
    console.log(`server listening on http://${host}:${port}`);
  });
  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = { createServer, startServer };
