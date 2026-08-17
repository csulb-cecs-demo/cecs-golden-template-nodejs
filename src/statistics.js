'use strict';

function validateValues(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new TypeError('values must be a non-empty array');
  }

  if (!values.every((value) => typeof value === 'number' && Number.isFinite(value))) {
    throw new TypeError('values must contain only finite numbers');
  }
}

/**
 * Return the arithmetic mean of a non-empty array of finite numbers.
 *
 * The C++ source project supplies ten integers, but keeping this pure helper
 * general makes it useful to the HTTP boundary and easy to test.
 */
function mean(values) {
  validateValues(values);
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * Return the median without changing the caller's array.
 *
 * For an even-length array, the median is the mean of the two middle values.
 */
function median(values) {
  validateValues(values);
  const sortedValues = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 1) {
    return sortedValues[middle];
  }

  return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
}

module.exports = { mean, median };
