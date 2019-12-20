function AutoComplete(parentElement, textArea, pre) {
	this.textArea = null;
	this.pre = null;
	this.parentElement = null;

	this.es5Keywords = ["abstract", "arguments", "boolean", "break", "byte", "case", "catch", "char", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "eval", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "in", "instanceof", "int", "interface", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"];
	this.es6Keywords = ["await", "enum", "export", "extends", "import", "let", "super", "class"];
	
	this.showSuggestionDiv  = null;
	
	this.init =  function() {
		this.textArea = textArea;
		this.pre = pre;
		this.parentElement = parentElement;
		this.keywords = this.es5Keywords.concat(this.es6Keywords);
		this.showSuggestionDiv = document.createElement('div');
		this.showSuggestionDiv.style.position ='absolute';
		this.showSuggestionDiv.style.left = 0;
		this.showSuggestionDiv.style.bottom = 0;
		// this.showSuggestionDiv.style.zIndex = 4;
		this.parentElement.appendChild(this.showSuggestionDiv);
		return this;
	}

	this.runAutoCompleteHandler = function(e) {
		this.autoCompleteBracketsQuotes(e.key);
		this.suggestionGenerator(e.key);
	}

	this.autoCompleteBracketsQuotes = function(pressedKey) {
		switch(pressedKey) {
			case '(':
				// console.log('(');
				this.autoInsertCloseBracket(')');
				break;
			case '[':
				// console.log('[');
				this.autoInsertCloseBracket(']');
				break;
			case '{':
				// console.log('{');
				this.autoInsertCloseBracket('}');	
				break;
			case '\'':
				// console.log('\'');
				this.autoInsertCloseBracket('\'');
				break;
			case '"':
				// console.log('"');
				this.autoInsertCloseBracket('"');
		}
	}

	// autoInsert Elements In Current Cursor Position
	this.autoInsertCloseBracket = function(closeBracket) {
		// console.log('autocomplete', this);
		var text = this.textArea.value;
		var curPos = this.textArea.selectionStart;
		
		text = text.split('').reduce( (total,curval,currindx) => {
			if(currindx === curPos -1) {
				return (total + curval + closeBracket);
			}else return total+curval;
		},'');

		this.textArea.value = text;
		this.textArea.selectionStart = curPos;
		this.textArea.selectionEnd = curPos;
	}

	// Autocomplete keywords and variable names;
	this.suggestionGenerator = function(pressedKey) {
		var text = this.textArea.value;
		var curPosStart = this.textArea.selectionStart;
		var curPosEnd = this.textArea.selectionEnd;
		var userInputRegExp;

		// reset the suggestions
		this.showSuggestionDiv.innerHTML = '';

		// ignore suggestion if arrow pressed
		if(pressedKey === 'ArrowLeft' || pressedKey === 'ArrowRight' || pressedKey === 'ArrowUp' || pressedKey === 'ArrowDown') {return};
		if(curPosStart !== curPosEnd ) return; // if user is selecting text no need to suggest anything

		// look what the user is typing and filter out needed ones
		var usrInput = [];
		// go back from current cursor position upto last space i.e for [ var myVari| ] this will get 'myVari' only    
		for(var i = curPosStart-1; i>=0; i--) {
			if(text[i] === ' ' || text[i] === '\n'
				|| text[i] === '(' || text[i] === ')'
				|| text[i] === '{' || text[i] === '}'
				|| text[i] === '[' || text[i] === ']'
				|| text[i] === '\'' || text[i] === '\''
				|| text[i] === '\"' || text[i] === '\"'
				|| text[i] === '+'
				) break;
			usrInput.unshift(text[i]);
		}

		// if empty string suggest nothing
		if(usrInput.length === 0) return;
		
		usrInput = usrInput.join().replace(/,/g,'');
		// console.log('user is currently typing ', usrInput);

		// Get Suggestions
		userInputRegExp = RegExp('^'+usrInput+'\\w+');

		var suggestions = this.keywords.filter(function(el){ return userInputRegExp.test(el) });

		// console.log('suggestions generated are ', suggestions);
		// show these suggestions in dom
		// console.log('suggestions generated are ', suggestions.map(function(el){return '<li>'+el+'</li>';}).join().replace(/,/g,''));
		this.showSuggestionDiv.innerHTML = '<ul class="autocomplete-ul">'+suggestions.map(function(el){return '<li>'+el+'</li>';}).join().replace(/,/g,'')+'</ul>';

		// this.showSuggestionDiv.style.left = ( ( curPosStart%45  * 12 ) + 37)+ 'px'; // 37-> is textArea's marginleft  12-> is width of each character
		// this.showSuggestionDiv.style.top = ((curPosStart/45) + 1)*50 + 'px';
	}


}