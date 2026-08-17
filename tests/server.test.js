'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { createServer } = require('../src/server');

let server;
let baseUrl;

test.before(async () => {
  server = createServer();
  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('GET /health reports that the service is ready', async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.strictEqual(response.status, 200);
  assert.deepStrictEqual(await response.json(), { status: 'ok' });
});

test('POST /statistics returns the mean and median', async () => {
  const response = await fetch(`${baseUrl}/statistics`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ data: [10, 2, 8, 4, 6, 1, 9, 3, 7, 5] }),
  });

  assert.strictEqual(response.status, 200);
  assert.deepStrictEqual(await response.json(), { mean: 5.5, median: 5.5 });
});

test('POST /statistics rejects data that is not ten integers', async () => {
  const response = await fetch(`${baseUrl}/statistics`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ data: [1, 2, 3] }),
  });

  assert.strictEqual(response.status, 400);
  assert.deepStrictEqual(await response.json(), {
    error: 'data must contain exactly 10 integers',
  });
});
