# execcommand-copy

Copy text to a user's clipboard using the modern execCommand interface.
This uses [the same browser API - document.execCommand](https://developer.mozilla.org/en-US/docs/Web/API/document/execCommand)
as the much-hyped [clipboard.js](https://github.com/zenorocha/clipboard.js),
but doesn't involve itself in the DOM or event binding.

## API

### available

Detect whether a browser supports the execCommand interface
for copying text.

Returns **boolean** whether the browser support text

### copy

Copy a snippet of text to a user's pasteboard if the user has
proper browser support.

**Parameters**

-   `text` **string** text snippet

**Examples**

```javascript
// using browser events with a click
var eCopy = require('execcommand-copy');
var a = document.getElementById('mybutton');
a.addEventListener('click', function() {
 eCopy.copy(this.innerHTML);
});
```

Returns **boolean** whether the text was copied
