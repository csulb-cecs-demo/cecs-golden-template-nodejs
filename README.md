# CECS Golden Template — Node.js Back-end Project

A framework-agnostic Node.js starter project for a small descriptive-statistics
back-end app. It ports the C++ sample's behavior—mean and median of ten
integers—using only Node.js built-ins. There are no runtime or test-framework
dependencies.

## Start here

Install and test the project with Node.js 20 or newer:

```bash
npm ci
npm test
```

Start the HTTP server on `127.0.0.1:3000`:

```bash
npm start
```

The server exposes:

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/health` | Readiness check. |
| `POST` | `/statistics` | Compute statistics for ten integers. |

Example request:

```bash
curl -X POST http://127.0.0.1:3000/statistics \
  -H 'content-type: application/json' \
  -d '{"data":[10,2,8,4,6,1,9,3,7,5]}'
```

The response is:

```json
{"mean":5.5,"median":5.5}
```

Set `HOST` or `PORT` to change the listening address. The app uses Node's
standard `http` module directly, so it can be adapted to a framework later
without coupling the statistics logic to that framework.

## Layout

| Path | Purpose |
|---|---|
| `src/statistics.js` | Pure mean and median functions. |
| `src/server.js` | Framework-free HTTP server and JSON API. |
| `tests/` | Unit and HTTP integration tests using `node:test`. |
| `.github/workflows/ci.yml` | Runs the test suite on pushes and pull requests. |
| `docs/` | Assignment and course-template guidance. |
| `VERIFICATION-LOG.md` | Student record of AI assistance and verification. |

## For students

Read [docs/assignment.md](docs/assignment.md), implement the exercise in
`src/`, and run `npm test` before pushing. CI runs the same command. Fill in
`VERIFICATION-LOG.md` before your final push.

## License

MIT. Fork it, adapt it, teach with it, and ship it in your own organization.
