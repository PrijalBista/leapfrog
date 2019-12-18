console.log('editor.js')

function Editor(element, w, h) {

	this.element = element;
	this.element.classList.add('editor');
	this.element.style.width = w + 'px';
	this.element.style.height = h + 'px';
	this.element.focus();

	this.initFromTextArea = function() {

		this.element.value = this.setInitialCode();

		return this;
	}

	this.initFromDiv = function() {
		this.element.innerText = this.setInitialCode();
		return this;
	}

	this.setInitialCode = function() {
		return 'function test() {\n console.log(\'Hello World\');\n}\ntest();'
	}

}