console.log('chk');

var textArea = document.getElementById('textArea');
var displayCodeArea = document.getElementById('displayCodeArea');

var pre = document.createElement('pre');
displayCodeArea.appendChild(pre);

textArea.addEventListener('keyup', function(){
	// console.log('TEXTAREA: ', textArea.value);
	// console.log('TextArea cursor: ', textArea.selectionStart);
	Parser(textArea.value);
});

// setup a cursor
var cursor = document.createElement('span');
cursor.style.position = 'absolute';
cursor.innerText= '|';
displayCodeArea.appendChild(cursor);
// Event Listener for DisplayArea
var selection = window.getSelection();

displayCodeArea.addEventListener('click', function(e) {
	console.clear();
	console.log(selection.focusOffset);
	console.log(selection.focusNode.parentElement.offsetTop);
	console.log(selection.focusNode.data[selection.focusOffset]);
	// test cursor positioning
	cursor.style.top = selection.focusNode.parentElement.offsetTop + 'px';
	// left calculation
	// span's left offset + numberline gutter width(40px) + focusOffset* 14px;
	// var left = selection.focusNode.parentElement.offsetLeft + 40 + selection.focusOffset * 20;
	// cursor.style.left = left + 'px';
});





var keywords = 'abstract	arguments	await*	boolean break	byte	case	catch char	class*	const	continue debugger	default	delete	do double	else	enum*	eval export*	extends*	false	final finally	float	for	function goto	if	implements	import* in	instanceof	int	interface let*	long	native	new null	package	private	protected public	return	short	static super*	switch	synchronized	this throw	throws	transient	true try	typeof	var	void volatile	while	with	yield';
keywords = keywords.replace(/	/g, ' ');

var es6Keywords = keywords.split(' ').filter(el => el[el.length-1] === '*')
es6Keywords = es6Keywords.map(el => el.replace('*','')); 

var es5Keywords = keywords.split(' ').filter(el => el[el.length-1] !== '*')


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
		var words = line.split(/ /g);
		
		words.forEach(word => {
			// console.log('word : ', word);
			var innerSpan = document.createElement('span');
			
			if(checkJsKeywordMatch(word)) {
				// console.log('match : ', word);
				innerSpan.classList.add('js-keyword');
				innerSpan.innerText = word + ' ';
				wrapperSpan.appendChild(innerSpan);
			}
			else if(checkJsNumberMatch(word)) {
				innerSpan.setAttribute('class', 'js-number');
				innerSpan.innerText = word + ' ';
				wrapperSpan.appendChild(innerSpan);
			}
			else {
				wrapperSpan.innerHTML += word + ' ';
			}
		});
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

function ParseLine() {


}