# scribe-plugin-smart-lists [![Build Status](https://travis-ci.org/guardian/scribe-plugin-smart-lists.svg?branch=master)](https://travis-ci.org/guardian/scribe-plugin-smart-lists)

## Installation
```
bower install scribe-plugin-smart-lists
```

Alternatively, you can [access the distribution files through GitHub releases](https://github.com/guardian/scribe-plugin-smart-lists/releases).

## Usage Example

scribe-plugin-smart-lists is an AMD module:

``` js
require(['scribe', 'scribe-plugin-smart-lists'], function (Scribe, scribePluginSmartLists) {
  var scribeElement = document.querySelector('.scribe');
  // Create an instance of Scribe
  var scribe = new Scribe(scribeElement);

  scribe.use(scribePluginSmartLists());
});
```
