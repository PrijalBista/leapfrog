var ball_container_width = 600; 
var ball_container_height = 600;
var BALL_DIAMETER = 50;

var grid = document.getElementById('ball-container');
grid.style.width = ball_container_width + '.px';
grid.style.height = ball_container_height + '.px';

// Initial Params
var x  = Math.floor(ball_container_width/2);
var y  = Math.floor(ball_container_height/2);
var velocity = 5;

// Create And Add A Ball
var ball = document.createElement('span');
ball.setAttribute('class', 'ball');
ball.setAttribute('id', 'theBall');
ball.style.position = 'absolute';
ball.style.top = y + '.px';
ball.style.left = x + '.px';
grid.appendChild(ball);


setInterval(update, 1000/60);

function update () {
	// update ball position
	// y = parseInt(ball.style.top.split('px')[0]) + velocity;
	y += velocity;
	
	// check for boundary
	if( y < 0 ){
		velocity = -velocity;
		y = 0;
	}
	
	else if(y > ball_container_height - BALL_DIAMETER){
		velocity = -velocity;
		y = ball_container_height - BALL_DIAMETER;
	}

	// update the ball position in DOM
	ball.style.top = y + '.px';
}
