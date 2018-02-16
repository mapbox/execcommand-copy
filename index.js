/**
 * Detect whether a browser supports the execCommand interface
 * for copying text.
 *
 * @returns {boolean} whether the browser support text
 */
function available() {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
  var browser = navigator.userAgent.match(/(Firefox|Chrome|Safari|Opera)\/(\d+)/);
  return 'execCommand' in document && !!(browser && {
    Firefox: parseInt(browser[2], 10) >= 41,
    Chrome: parseInt(browser[2], 10) >= 43,
    Safari: parseInt(browser[2], 10) >= 10,
    Opera: parseInt(browser[2], 10) >= 29
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
