'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { mean, median } = require('../src/statistics');

test('mean finds the mean of consecutive values', () => {
  assert.strictEqual(mean([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 5.5);
});

test('mean finds the mean with negative values', () => {
  assert.strictEqual(mean([-10, -8, -6, -4, -2, 2, 4, 6, 8, 10]), 0);
});

test('median finds the median of unsorted values', () => {
  assert.strictEqual(median([10, 2, 8, 4, 6, 1, 9, 3, 7, 5]), 5.5);
});

test('median finds the median with repeated values', () => {
  assert.strictEqual(median([8, 3, 3, 1, 8, 3, 5, 3, 9, 3]), 3);
});

test('median does not change the input array', () => {
  const data = [10, 2, 8, 4, 6, 1, 9, 3, 7, 5];
  const originalData = [...data];

  median(data);

  assert.deepStrictEqual(data, originalData);
});

test('statistics reject empty input', () => {
  assert.throws(() => mean([]), TypeError);
  assert.throws(() => median([]), TypeError);
});
