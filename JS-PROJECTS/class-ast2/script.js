var points = [
    {x: 10, y: 20},
    {x: 40, y: 40},
    {x: 60, y: 20},
    {x: 400, y: 60},
    {x: 100, y: 350},
    {x: 0, y: 0},
    {x: 500, y: 500}
];
// WIDTH AND HEIGHT
var GRID_WIDTH = '600px'; 
var GRID_HEIGHT = '600px';
var POINT_DIAMETER = 6;

var grid = document.getElementById('grid-container');
grid.style.width = GRID_WIDTH;
grid.style.height = GRID_HEIGHT;

// drawing Point
function drawPoint ( x, y ) {
	var newPoint = document.createElement('span');
	
	newPoint.style.height = POINT_DIAMETER + '.px';
	newPoint.style.width = POINT_DIAMETER + '.px';
	var newX = x + Math.floor(POINT_DIAMETER/2);
	var newY = y + Math.floor(POINT_DIAMETER/2);
	
	newPoint.style.position = 'absolute';
	newPoint.style.left =  newX + '.px';  // x -coordinate
	newPoint.style.bottom = newY + '.px'; // y - coordinate
	newPoint.setAttribute('class','point');
	
	grid.appendChild(newPoint);
}

points.forEach( function(el) { drawPoint(el.x, el.y); } );