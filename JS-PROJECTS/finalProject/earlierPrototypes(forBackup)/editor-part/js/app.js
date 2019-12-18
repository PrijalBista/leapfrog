console.log('app.js')

// var txtarea = document.getElementById('editor');
var divarea = document.getElementById('editor');

var editorConfig = {
	lineNumber: true,
	width: { value:100, unit: '%'},
	height: {value:700, unit: 'px'},
};

var editor = new Editor(divarea, editorConfig).init();