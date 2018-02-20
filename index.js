/**
 * Detect if there is browser support for the copy command feature.
 *
 * @returns {boolean} whether or not the browser supports copy
 */
function available() {
  return !!document.queryCommandSupport && document.queryCommandSupport('copy');
}

/**
 * Copy a snippet of text to a user's pasteboard if the user has
 * proper browser support.
 *
 * @param {string} text text snippet
 * @returns {boolean} whether the text was copied
 * @example
 * // using browser events with a click
 * var eCopy = require('execcommand-copy');
 * var a = document.getElementById('mybutton');
 * a.addEventListener('click', function() {
 *  eCopy.copy(this.innerHTML);
 * });
 */
function copy(text) {
  var fakeElem = document.body.appendChild(document.createElement('textarea'));
  fakeElem.style.position = 'absolute';
  fakeElem.style.left = '-9999px';
  fakeElem.setAttribute('readonly', '');
  fakeElem.value = text;
  fakeElem.select();
  try {
    return document.execCommand('copy');
  } catch (err) {
    return false;
  } finally {
    fakeElem.parentNode.removeChild(fakeElem);
  }
}

module.exports.copy = copy;
module.exports.available = available;
