function AutoComplete(textArea, pre) {
	
	this.init =  function() {
		this.textArea = textArea;
		this.pre = pre;

		return this;
	}

	this.runAutoCompleteHandler = function(e) {
		this.autoCompleteBracketsQuotes(e.key);
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
}