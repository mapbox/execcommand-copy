/**
 * Detect whether a browser supports the execCommand interface
 * for copying text.
 *
 * @returns {boolean} whether the browser support text
 */
function available() {
  // https://gist.github.com/jonrohan/81085b119d16cdd7868a
  var browser = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+)/);
  return 'execCommand' in document && !!(browser && {
    Firefox: parseInt(browser[2], 10) >= 41,
    Chrome: parseInt(browser[2], 10) >= 43
  }[browser[1]]);
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
