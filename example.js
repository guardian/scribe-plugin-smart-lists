require({
  paths: {
    'scribe': './bower_components/scribe/scribe',
    'scribe-plugin-smart-lists': './bower_components/scribe-plugin-smart-lists/scribe-plugin-smart-lists'
  }
}, [
  'scribe',
  'scribe-plugin-smart-lists'
], function (
  Scribe,
  scribePluginSmartLists
) {

  'use strict';

  var scribe = new Scribe(document.querySelector('.scribe'), { allowBlockElements: true });

  scribe.on('content-changed', updateHTML);

  function updateHTML() {
    document.querySelector('.scribe-html').value = scribe.getHTML();
  }

  /**
   * Plugins
   */

  scribe.use(scribePluginSmartLists());

  if (scribe.allowsBlockElements()) {
    scribe.setContent('<p>Hello, World!</p>');
  } else {
    scribe.setContent('Hello, World!');
  }
});
