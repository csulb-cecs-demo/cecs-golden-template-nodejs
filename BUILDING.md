# Building the Node.js Demo

The project uses the Node.js standard library and has no package dependencies.
Use Node.js 20 or newer.

Install the lockfile and run the tests:

```powershell
npm ci
npm test
```

Run the back-end app:

```powershell
npm start
```

The default address is `http://127.0.0.1:3000`. Set a different port with
`$env:PORT = 3001` before running `npm start`.
