function Highlighter(textArea, pre) {

	var that = this;

	this.init = function() {
		this.textArea = textArea;
		this.pre  = pre;

		// this.keywords = 'abstract	arguments	await*	boolean break	byte	case	catch char	class*	const	continue debugger	default	delete	do double	else	enum*	eval export*	extends*	false	final finally	float	for	function goto	if	implements	import* in	instanceof	int	interface let*	long	native	new null	package	private	protected public	return	short	static super*	switch	synchronized	this throw	throws	transient	true try	typeof	var	void volatile	while	with	yield';
		this.keywords = 'abstract	arguments	await*	boolean break	byte	case	catch char	const	continue debugger	default	delete	do double	else	enum*	eval export*	extends*	false	final finally	float	for	function goto	if	implements	import* in	instanceof	int	interface let*	long	native	new null	package	private	protected public	return	short	static super*	switch	synchronized	this throw	throws	transient	true try	typeof	var	void volatile	while	with	yield';
		this.keywords = this.keywords.replace(/	/g, ' ');

		this.es6Keywords = this.keywords.split(' ').filter(el => el[el.length-1] === '*')
		this.es6Keywords = this.es6Keywords.map(el => el.replace('*',''));
		this.es6Keywords.push('class(?!=)');

		this.es5Keywords = this.keywords.split(' ').filter(el => el[el.length-1] !== '*')

		this.allKeywords = this.es5Keywords.join().replace(/,/g, '|') + this.es6Keywords.join().replace(/,/g, '|');
		// allKeywordsRegExp = allKeywordsRegExp.replace(/(\w+)/g, '($1)'); //(function)|(while)| ...
		this.allKeywordsRegExp = RegExp('\\b('+this.allKeywords+')\\b', 'g');
		this.domKeywords = 'alert	all	anchor	anchors area	assign	blur	button checkbox	clearInterval	clearTimeout	clientInformation close	closed	confirm	constructor crypto	decodeURI	decodeURIComponent	defaultStatus document	element	elements	embed embeds	encodeURI	encodeURIComponent	escape event	fileUpload	focus	form forms	frame	innerHeight	innerWidth layer	layers	link	location mimeTypes	navigate	navigator	frames frameRate	hidden	history	image images	offscreenBuffering	open	opener option	outerHeight	outerWidth	packages pageXOffset	pageYOffset	parent	parseFloat parseInt	password	pkcs11	plugin prompt	propertyIsEnum	radio	reset screenX	screenY	scroll	secure select	self	setInterval	setTimeout status	submit	taint	text textarea	top	unescape	untaint window';
		this.domKeywords = this.domKeywords.replace(/	/g, ' ');
		this.domKeywords = this.domKeywords.split(' ');

		this.eventHandlerMethods = `onblur	onclick	onerror	onfocus onkeydown	onkeypress	onkeyup	onmouseover onload	onmouseup	onmousedown	onsubmit`;
		this.eventHandlerMethods = this.eventHandlerMethods.replace(/	/g, ' ');
		this.eventHandlerMethods = this.eventHandlerMethods.split(' ');

		return this;
	}

	this.Parser = function(code) {
		// console.log('parser',this);
		var lines = code.split(/\n/g);
		// console.log('no of lines : ', lines.length);

		// Reset Pre
		that.pre.innerHTML = '';

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

			// Highlight identifiers of var
			// highlightedLine = highlightedLine.replace(/(?<=var\s)(\w+)/g, '<span class="js-identifier">$1</span>');
			// Highlight identifiers of function
			// highlightedLine = highlightedLine.replace(/(?<=function)\s+?(?![0-9])((\w|[$])+)/g, '<span class="js-identifier-func">$&</span>');
			// Highlight Keywords 
			highlightedLine = highlightedLine.replace(that.allKeywordsRegExp, '<span class="js-keyword">$1</span>');
			// Highlight numbers
			highlightedLine = highlightedLine.replace(/(\d+)(?!'\d+?')/g,'<span class="js-number">$1</span>');
			// Highlight strings inside quotes
			highlightedLine = highlightedLine.replace(/('.*?')/g, '<span class="js-single-quote-string">$1</span>');
			// highlightedLine = highlightedLine.replace(/(?!^")("(?!js-).*?")(?="$)/g, '<span class="js-double-quote-string">$1</span>'); // Todo using lookaheads
			// ("(?!js-).*?")
			
			wrapperSpan.innerHTML += highlightedLine;

			that.pre.innerHTML += '\n';
			that.pre.appendChild(wrapperSpan);
		});
	}
}
