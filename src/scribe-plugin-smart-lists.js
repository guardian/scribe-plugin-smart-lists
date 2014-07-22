define(['scribe-common/src/element'], function (element) {

  'use strict';

  return function () {

    var keys = {
      32: 'Space',
      42: '*',
      45: '-',
      46: '.',
      49: '1',
      // Bullet insertion keycode, most likely only working on OS X...
      8226:  '•'
    };

    function isUnorderedListChar(string) {
      return string === '*' || string === '-' || string === '•';
    }

    function findBlockContainer(node) {
      while (node && ! element.isBlockElement(node)) {
        node = node.parentNode;
      }

      return node;
    }

    return function (scribe) {

      var preLastChar, lastChar, currentChar;

      function removeSelectedTextNode() {
        var selection = new scribe.api.Selection();
        var container = selection.selection.anchorNode;
        /**
         * Firefox: Selection object never gets access to text nodes, only
         * parent elements.
         * As per: http://jsbin.com/rotus/1/edit?js,output,console
         */
        var textNode = (container.nodeType === Node.TEXT_NODE && container)
          || (container.firstChild.nodeType === Node.TEXT_NODE && container.firstChild)
        if (textNode) {
          textNode.parentNode.removeChild(textNode);
        } else {
          throw new Error('Cannot empty non-text node!');
        }
      }

      function input(event) {
        var listCommand;

        preLastChar = lastChar;
        lastChar = currentChar;
        // FIXME: Chrome / FF, theoretically we should be using event.key?
        //        can we abstract this madness?
        currentChar = keys[event.charCode];

        var selection = new scribe.api.Selection();

        // TODO: if a <p> with just this content
        var container = selection.range.commonAncestorContainer;

        // If in a <p>
        var blockContainer = findBlockContainer(container);
        if (blockContainer && blockContainer.tagName === 'P') {
          var startOfLineIsUList = isUnorderedListChar(container.textContent[0]);
          if (isUnorderedListChar(lastChar) && currentChar === 'Space' && startOfLineIsUList) {
            listCommand = 'insertUnorderedList';
          }

          var startOfLineIsOList = container.textContent === '1.';
          if (preLastChar === '1' && lastChar === '.' && currentChar === 'Space' && startOfLineIsOList) {
            listCommand = 'insertOrderedList';
          }
        }

        if (listCommand) {
          // Ignore the typed character
          event.preventDefault();

          scribe.transactionManager.run(function() {
            scribe.getCommand(listCommand).execute();

            // Clear "* "/etc from the list item
            removeSelectedTextNode();
          });
        }
      }

      scribe.el.addEventListener('keypress', input);
    };
  };

});
