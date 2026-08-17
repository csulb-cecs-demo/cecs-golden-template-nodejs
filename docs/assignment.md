# Sample Assignment — Descriptive Statistics API

*Instructors: replace this file with your own assignment instructions.*

## What to do

Implement the statistics behavior in `src/statistics.js` and keep the HTTP
contract in `src/server.js` working.

The `POST /statistics` endpoint accepts a JSON object with exactly ten
integers:

```json
{"data":[10,2,8,4,6,1,9,3,7,5]}
```

It returns the arithmetic mean and the median, where the median of an even
number of values is the mean of the two middle values after sorting.

| Function | Returns | Edge case |
|---|---|---|
| `mean(values)` | arithmetic mean | rejects an empty array |
| `median(values)` | middle value, or mean of the middle two | rejects an empty array |

The pure functions must not change their input array. Do not change their
names or exports; the tests import them directly.

## How you are graded

Run the same suite used by CI:

```bash
npm ci
npm test
```

There are no hidden tests in this sample. What you see is what is scored.

## Before you push

Fill in `VERIFICATION-LOG.md`. If you used an AI tool, say what you asked for
and how you checked the result. An empty log is not the same as "I did not use
one."
