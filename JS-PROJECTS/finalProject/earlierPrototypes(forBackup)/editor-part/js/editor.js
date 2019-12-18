console.log('editor.js')

function Editor(parentElement, config) {

	this.parentElement = null;
	this.element = null;
	this.lineNumber = null;
	this.config = null;
	this.browser = null;

	this.init = function() {

		this.parentElement = parentElement;
		this.parentElement.classList.add('editor-container');
		this.config = config;

		this.parentElement.style.width = this.config.width.value + this.config.width.unit;
		this.parentElement.style.height = this.config.height.value + this.config.height.unit;

		this.browser = new BrowserDetect();

		this.element = document.createElement('textarea');
		this.element.classList.add('editor');
		// this.element.style.width = w + 'px';
		// this.element.style.height = h + 'px';
		this.element.value = this.setInitialCode();
		this.parentElement.appendChild(this.element);

		this.textAreaAdjust(this.element);
		
		if(this.config.lineNumber) this.initLineNumber();
		else this.element.style.paddingLeft = '10px';

		this.element.focus();
		// Add Event Listener to Editor
		// Setup a listener 
		this.element.addEventListener('keyup', this.updateEditor.bind(this));
		return this;
	}

	this.setInitialCode = function() {
		return 'function test() {\n console.log(\'Hello World\');\n}\n\n\n\n\n\ntest();';
	}

	this.initLineNumber = function() {
		this.lineNumber = new LineNumber(this.parentElement, this.element, this.config).init();
	}

	this.textAreaAdjust = function(o) {
	  o.style.height = "1px";
	  o.style.height = (25+o.scrollHeight)+"px";
	}

	this.updateEditor = function() {
		this.textAreaAdjust(this.element);
		if(this.config.lineNumber) this.lineNumber.updateLineNumber();

		// Make Text area focused again and auto scroll to the cursor position
		this.element.blur();
		this.element.focus();
		if(this.browser.isFirefox) {
			console.log('CRITICAL_ISSUE_FIREFOX: Fix Focus In Firefox');
		}
	}
}



function BrowserDetect() {

	// Ref from https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
	
	// Opera 8.0+
	this.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	this.isFirefox = typeof InstallTrigger !== 'undefined';

	// Safari 3.0+ "[object HTMLElementConstructor]" 
	this.isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

	// Internet Explorer 6-11
	this.isIE = /*@cc_on!@*/false || !!document.documentMode;

	// Edge 20+
	this.isEdge = !this.isIE && !!window.StyleMedia;

	// Chrome 1 - 71
	this.isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

	// Blink engine detection
	this.isBlink = (this.isChrome || this.isOpera) && !!window.CSS;

	this.showDetails = function() {
		var output = 'Detecting browsers by ducktyping:\n';
		output += 'isFirefox: ' + this.isFirefox + '\n';
		output += 'isChrome: ' + this.isChrome + '\n';
		output += 'isSafari: ' + this.isSafari + '\n';
		output += 'isOpera: ' + this.isOpera + '\n';
		output += 'isIE: ' + this.isIE + '\n';
		output += 'isEdge: ' + this.isEdge + '\n';
		output += 'isBlink: ' + this.isBlink + '\n';
		console.log(output);
	}
}