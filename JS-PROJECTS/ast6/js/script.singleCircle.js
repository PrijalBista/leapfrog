// Initialize Canvas and get its context
var c = document.getElementById("helix");
var ctx = c.getContext("2d");

// DrawCircle(50,50,20);
// // clearScreen();
// DrawCircle(50,80,20);


var helixanim = new HelixAnimation(c).init();




function DrawCircle(x,y,r) {
	// ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = '#5395b8';
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI); 
	ctx.closePath();
	ctx.fill();
}



function HelixAnimation(canvasElement) {

	this.parentElement = null;
	this.context = null;
	this.frame = 0;
	this.width = 0;
	this.height = 0;
	this.speed = 0.03;
	this.phase = 0;
	this.maxCircleRadius = 20;

	this.init = function() {
		// Initializations
		this.parentElement = canvasElement;
		this.context = this.parentElement.getContext('2d');
		this.frame = 0;
		this.width = this.parentElement.width;
		this.height = this.parentElement.height;
		// Start the Animation loop
		window.requestAnimationFrame(this.loop.bind(this));
		return this;
	}

	this.loop = function() {
		// Clear Previous paint in canvas
		this.clearScreen();

		var x = this.width/2;
		this.phase = this.frame * this.speed;

		var sizeOffset = (Math.cos(this.phase) + 1) * 0.5;
		var circleRadius = sizeOffset * this.maxCircleRadius;

		var y = this.height/2 + Math.sin(this.phase) * 100;

		DrawCircle(x, y, circleRadius);

		// increase frame count and rerun loop
		this.frame++;
		window.requestAnimationFrame(this.loop.bind(this));
	}

	this.clearScreen = function() {
		this.context.clearRect(0, 0, c.width, c.height);
	}
}
// OOP VERSION 
// var circle = new Circle(c, 70, 70 , 20).init(1);
// // clearScreen();
// circle.draw();
// circle.update(39,39,20);
// // clearScreen();
// circle.draw();
