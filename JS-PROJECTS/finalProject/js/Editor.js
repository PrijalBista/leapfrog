function Editor(parentElement,config) {
	
	this.config = null;
	this.parentElement = null;
	this.textArea = null;
	this.displayCodeArea = null;
	this.pre = null; // placed inside displayCodeArea(div) to present code
	this.highlighter = null;
	this.autocomplete = null;
	this.config = null;
	
	this.width = 100;
	this.height = 500;

	var that = this;

	this.init = function() {
		this.config = config || {};

		this.parentElement = parentElement;
		this.parentElement.classList.add('js-editor');

		this.textArea = document.createElement('textArea');
		this.textArea.setAttribute('name', 'textArea');
		this.textArea.classList.add('textArea');

		this.displayCodeArea = document.createElement('div');
		this.displayCodeArea.classList.add('displayCodeArea');
		this.displayCodeArea.classList.add('wordwrap');
		this.displayCodeArea.classList.add('remove-scrollbar');
		
		this.displayCodeArea.style.height = this.height + 'px';
		this.displayCodeArea.style.overflowY = 'auto';

		this.parentElement.appendChild(this.textArea);
		this.parentElement.appendChild(this.displayCodeArea);

		this.pre = document.createElement('pre');
		this.displayCodeArea.appendChild(this.pre);

		// initialize syntax highlighter module
		this.highlighter = new Highlighter(this.textArea, this.pre).init();
		// initialize autocomplete module
		this.autocomplete = new AutoComplete(this.parentElement, this.textArea, this.pre).init();
		this.initializeEventListeners();
		return this;
	}

	this.initializeEventListeners = function() {
		this.textArea.addEventListener('keydown', this.tabHandler.bind(this));
		this.textArea.addEventListener('keyup', this.keyPressHandler.bind(this));
		this.textArea.addEventListener('scroll', this.scrollHandler.bind(this));
		// handle ctrl+c to copy whole line when not selected

		this.textArea.addEventListener('copy', function(e) {

			if(that.textArea.selectionStart !== that.textArea.selectionEnd) return;
			// console.log('copy event',e);
			var lines = that.textArea.value.split(/\n/g);
			var lineNumber  = that.highlighter.detectLineNumber();
			var lineText = that.highlighter.selectTextAreaLine(lines, lineNumber);
			e.preventDefault();
			
			if (e.clipboardData) {
			    e.clipboardData.setData('text/plain', lineText);
			} else if (window.clipboardData) {
			    window.clipboardData.setData('Text', lineText);
			} 	
		});
	}

	this.tabHandler = function(e) {

		if(e.keyCode === 9) {
			// console.log('handle Tab (keyCode: 9)');
			e.preventDefault();
		
			var text = this.textArea.value;
			var curPos = this.textArea.selectionStart;
			// console.log('text: ',text.split(''), 'and cur position',curPos);

			// text.split('').forEach( (el,i) => {
			// 	if(i === curPos-1) console.log('add tab after this: ',el);
			// });

			text = text.split('').reduce( (total,curval,currindx) => {
				if(currindx === curPos -1) {
					return (total + curval + '  ');
				}else return total+curval;
			},'');

			this.textArea.value = text;
			this.textArea.selectionStart = curPos + 2;
			this.textArea.selectionEnd = curPos + 2;
		}
	}

	this.keyPressHandler = function(e) {
		// var pressedKey = e.key;
		this.autocomplete.runAutoCompleteHandler(e);
		this.highlighter.Parser(this.textArea.value);
		// the textArea doesnt auto scroll to bottom :( so programatically scrolling it to bottom
		// this.textArea.scrollTop = this.textArea.scrollHeight; // not needed
		this.scrollHandler();
	}

	this.scrollHandler = function() {
		var scrolltop = this.textArea.scrollTop;

		this.displayCodeArea.scrollTop = scrolltop;
	}

	this.getText = function() {
		return this.textArea.value;
	}
}
