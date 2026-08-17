# Student Build Guide

This project is a small Node.js back-end app. It accepts ten integers at
`POST /statistics` and returns their mean and median. It uses:

- Node.js 20 or newer
- Node's built-in `http` module
- Node's built-in `node:test` test runner

No framework or package installation beyond Node.js is required.

## Install and test

From the project directory, run:

```bash
npm ci
npm test
```

The test command runs both the statistics unit tests and the HTTP integration
tests. CI runs the same command.

## Run the app

Start the server with:

```bash
npm start
```

Then check it:

```bash
curl http://127.0.0.1:3000/health
curl -X POST http://127.0.0.1:3000/statistics \
  -H 'content-type: application/json' \
  -d '{"data":[1,2,3,4,5,6,7,8,9,10]}'
```

Expected statistics response:

```json
{"mean":5.5,"median":5.5}
```

Use `PORT` and `HOST` environment variables when a different address is
needed. Read [docs/assignment.md](docs/assignment.md) for the exercise
contract, and fill in `VERIFICATION-LOG.md` before your final push.
