// LineNumber Type
function LineNumber(parentElement, element, config) {
	
	this.lineNumberTxtArea = null;
	this.parentElement = null;
	this.element = null;
	this.config = null;

	this.init = function() {

		this.parentElement = parentElement;
		this.element = element;
		this.config = config;

		this.lineNumberTxtArea = document.createElement('textarea');
		this.lineNumberTxtArea.classList.add('lineNumber');
		this.parentElement.appendChild(this.lineNumberTxtArea);
		this.updateLineNumber();
		return this;
	}

	this.updateLineNumber = function() {
		var lineNumbers = '';
		for(var i = 1; i <= this.element.value.split('\n').length; i++) {
			lineNumbers = lineNumbers.concat(i+'\n');
		}
		// console.log('lineNumbers',lineNumber);
		this.lineNumberTxtArea.value = lineNumbers;
		this.lineNumberTxtArea.readOnly = true;
		this.lineNumberTxtArea.classList.add('lineNumber');

		// update height of the line number text area in sync with the scroll height of div
		if(this.element.scrollHeight < this.config.height.value) {
			this.lineNumberTxtArea.style.height = this.config.height.value + this.config.height.unit;
		} else {
			this.lineNumberTxtArea.style.height = this.element.style.height;
		}
	}
}