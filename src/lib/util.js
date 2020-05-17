/**
 * isDomAvailable
 * @description Checks to see if the DOM is available by checking the existence of the window and document
 * @see https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js#L12
 */

export function isDomAvailable() {
  return typeof window !== 'undefined' && !!window.document && !!window.document.createElement;
}

/**
 * sortByObjectKey
 * @param {array} array Array to sort
 * @param {string} key Object key to sort on
 * @via https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
 */

export function sortByObjectKey( array, key ) {
  return array.sort( function ( a, b ) {
    const keyA = a[key];
    const keyB = b[key];
    if ( keyA < keyB ) return -1;
    if ( keyA > keyB ) return 1;
    return 0;
  });
}
