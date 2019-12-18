console.log('asdfa');
var editor = document.getElementById('editor-1');

editor.addEventListener('keyup', function(e) {
	if (e.keyCode === 9) {
	    e.preventDefault();
	}

	var keyPressed = e.key;

	console.log('keypressed', keyPressed);

	if(keyPressed == 'Enter') {
		console.log('pressed Enter so indent lines');
	}
	else if(keyPressed === 'ArrowUp' || 
			keyPressed === 'ArrowDown' || 
			keyPressed === 'ArrowLeft' || 
			keyPressed === 'ArrowRight' ||
            keyPressed === 'Shift') {
		console.log('pressed Arrows. Let browser do its thing');
	}
	else {
		syntaxHighlight(editor);
	}
});

function syntaxHighlight(editor) {
	// console.log('highlight Logic');

	console.log('editor content ', editor.innerText);
	console.log('total lines ', editor.innerText.split('\n').length);
	// var span = document.createElement('span');
	// // span.innerText = editor.innerText;
	// span.innerText = 'lesdf';

	// editor.appendChild(span);
	var cursorPosition = getCurrentCursorPosition('editor-1');
	var rawCode = editor.innerText;
	rawCode = rawCode.replace(/var/g, '<span class="js-keyword">var</span>');

	// rawCode = rawCode.replace(/\n/g, '<br>'); // inner Text into innerHTML .. so needs conversion of newline
	editor.innerHTML = rawCode;
	 // do manipulation and rewrite editor div
	// console.log('cursor Offsets ',cursorPosition);
	setCurrentCursorPosition(cursorPosition);
	editor.focus();
}



function parseVarKeyword(editor) {
}



//  TEST

function createRange(node, chars, range) {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                range.setEnd(node, chars.count);
                chars.count = 0;
            }
        } else {
           for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                    break;
                }
            }
        }
    } 

    return range;
};


function setCurrentCursorPosition(chars) {
    if (chars >= 0) {
        var selection = window.getSelection();

        range = createRange(document.getElementById("editor-1"), { count: chars });

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};


function isChildOf(node, parentId) {
    while (node !== null) {
        if (node.id === parentId) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
};

function getCurrentCursorPosition(parentId) {
    var selection = window.getSelection(),
        charCount = -1,
        node;

    if (selection.focusNode) {
        if (isChildOf(selection.focusNode, parentId)) {
            node = selection.focusNode; 
            charCount = selection.focusOffset;

            while (node) {
                if (node.id === parentId) {
                    break;
                }

                if (node.previousSibling) {
                    node = node.previousSibling;
                    charCount += node.textContent.length;
                } else {
                     node = node.parentNode;
                     if (node === null) {
                         break
                     }
                }
           }
      }
   }

    return charCount;
};