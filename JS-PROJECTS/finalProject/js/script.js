
var textArea = document.getElementById('textArea');
var displayCodeArea = document.getElementById('displayCodeArea');


var pre = document.createElement('pre');
displayCodeArea.appendChild(pre);

textArea.addEventListener('keydown',function(e) {
	if(e.keyCode === 9) {
		// console.log('handle Tab (keyCode: 9)');
		e.preventDefault();
	
		var text = textArea.value;
		var curPos = textArea.selectionStart;
		// console.log('text: ',text.split(''), 'and cur position',curPos);

		// text.split('').forEach( (el,i) => {
		// 	if(i === curPos-1) console.log('add tab after this: ',el);
		// });

		text = text.split('').reduce( (total,curval,currindx) => {
			if(currindx === curPos -1) {
				return (total + curval + '  ');
			}else return total+curval;
		},'');

		textArea.value = text;
		textArea.selectionStart = curPos + 2;
		textArea.selectionEnd = curPos + 2;

		// console.log('new outputt text ',text, 'zzzz');
	}
	// console.log('keydown', e.key);
});

textArea.addEventListener('keyup', function(e){
	// console.log('TEXTAREA: ', textArea.value);
	// console.log('TextArea cursor: ', textArea.selectionStart);
	var pressedKey = e.key;

	autoCompleteBrackets(pressedKey, textArea, displayCodeArea);

	Parser(textArea.value);
});



var keywords = 'abstract	arguments	await*	boolean break	byte	case	catch char	class*	const	continue debugger	default	delete	do double	else	enum*	eval export*	extends*	false	final finally	float	for	function goto	if	implements	import* in	instanceof	int	interface let*	long	native	new null	package	private	protected public	return	short	static super*	switch	synchronized	this throw	throws	transient	true try	typeof	var	void volatile	while	with	yield';
keywords = keywords.replace(/	/g, ' ');

var es6Keywords = keywords.split(' ').filter(el => el[el.length-1] === '*')
es6Keywords = es6Keywords.map(el => el.replace('*','')); 

var es5Keywords = keywords.split(' ').filter(el => el[el.length-1] !== '*')

var allKeywords = es5Keywords.join().replace(/,/g, '|') + es6Keywords.join().replace(/,/g, '|');
// allKeywordsRegExp = allKeywordsRegExp.replace(/(\w+)/g, '($1)'); //(function)|(while)| ...
var allKeywordsRegExp = RegExp('('+allKeywords+')', 'g');
var domKeywords = 'alert	all	anchor	anchors area	assign	blur	button checkbox	clearInterval	clearTimeout	clientInformation close	closed	confirm	constructor crypto	decodeURI	decodeURIComponent	defaultStatus document	element	elements	embed embeds	encodeURI	encodeURIComponent	escape event	fileUpload	focus	form forms	frame	innerHeight	innerWidth layer	layers	link	location mimeTypes	navigate	navigator	frames frameRate	hidden	history	image images	offscreenBuffering	open	opener option	outerHeight	outerWidth	packages pageXOffset	pageYOffset	parent	parseFloat parseInt	password	pkcs11	plugin prompt	propertyIsEnum	radio	reset screenX	screenY	scroll	secure select	self	setInterval	setTimeout status	submit	taint	text textarea	top	unescape	untaint window';
domKeywords = domKeywords.replace(/	/g, ' ');
domKeywords = domKeywords.split(' ');

var eventHandlerMethods = `onblur	onclick	onerror	onfocus onkeydown	onkeypress	onkeyup	onmouseover onload	onmouseup	onmousedown	onsubmit`;
eventHandlerMethods = eventHandlerMethods.replace(/	/g, ' ');
eventHandlerMethods = eventHandlerMethods.split(' ');


function Parser(code) {
	var lines = code.split(/\n/g);
	// console.log('no of lines : ', lines.length);

	// Reset Pre
	pre.innerHTML = '';

	lines.forEach((line, i) => {
		var wrapperSpan = document.createElement('span');
		wrapperSpan.setAttribute('class', 'presentation');
		// line number gutter
		var lineNumber = document.createElement('span');
		lineNumber.setAttribute('class', 'line-number-gutter')
		lineNumber.innerText = i;
		wrapperSpan.appendChild(lineNumber);
		// split lines with spaces

		var highlightedLine = line;
		// var regxFunc = /(function)(\s+)(\w+)/;

		// highlightedLine = highlightedLine.replace(regxFunc, '<span class="js-keyword">$1</span>$2<span class="js-identifier>$3</span>');
		highlightedLine = highlightedLine.replace(allKeywordsRegExp, '<span class="js-keyword">$1</span>');
		// Highlight numbers
		highlightedLine = highlightedLine.replace(/(\d+)(?!'\d+')/g,'<span class="js-number">$1</span>');
		// Highlight strings inside quotes
		highlightedLine = highlightedLine.replace(/('.*')/g, '<span class="js-single-quote-string">$1</span>');
		// highlightedLine = highlightedLine.replace(/(".*")/g, '<span class="js-double-quote-string">$1</span>'); // Todo using lookaheads


		

		wrapperSpan.innerHTML += highlightedLine;

		// var words = line.split(/ /g);
		
		// words.forEach(word => {
		// 	// console.log('word : ', word);
		// 	var innerSpan = document.createElement('span');
			
		// 	if(checkJsKeywordMatch(word)) {
		// 		// console.log('match : ', word);
		// 		innerSpan.classList.add('js-keyword');
		// 		innerSpan.innerText = word + ' ';
		// 		wrapperSpan.appendChild(innerSpan);
		// 	}
		// 	else if(checkJsNumberMatch(word)) {
		// 		innerSpan.setAttribute('class', 'js-number');
		// 		innerSpan.innerText = word + ' ';
		// 		wrapperSpan.appendChild(innerSpan);
		// 	}
		// 	else {
		// 		wrapperSpan.innerHTML += word + ' ';
		// 	}
		// });
		pre.innerHTML += '\n';
		pre.appendChild(wrapperSpan);
	});
}

function checkJsKeywordMatch(word) {
	return es5Keywords.some(k => k === word) || es6Keywords.some(k => k === word);
}
function checkJsNumberMatch(word) {
	return !isNaN(word.split(';')[0]);
}


function autoCompleteBrackets(pressedKey, textArea, displayCodeArea){
	switch(pressedKey) {
		case '(':
			// console.log('(');
			autoInsertCloseBracket(')');
			break;
		case '[':
			// console.log('[');
			autoInsertCloseBracket(']');
			break;
		case '{':
			// console.log('{');
			autoInsertCloseBracket('}');	
			break;
		case '\'':
			// console.log('\'');
			autoInsertCloseBracket('\'');
			break;
		case '"':
			// console.log('"');
			autoInsertCloseBracket('"');
	}
}

// autoInsert Elements In Current Cursor Position
function autoInsertCloseBracket(closeBracket) {

	var text = textArea.value;
	var curPos = textArea.selectionStart;
	
	text = text.split('').reduce( (total,curval,currindx) => {
		if(currindx === curPos -1) {
			return (total + curval + closeBracket);
		}else return total+curval;
	},'');

	textArea.value = text;
	textArea.selectionStart = curPos;
	textArea.selectionEnd = curPos;
}
