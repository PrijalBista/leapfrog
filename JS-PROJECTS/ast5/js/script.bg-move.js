

// Bird Type
function Bird(parentElement) {
	// Bird image width height  = 240 x 202
	this.parentElement = null;
	this.element = null;
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	var that = this;

	this.init = function() {
		this.parentElement = parentElement;

		this.context = this.parentElement.getContext('2d');
		return this;
	}

	// this.drawBackground = function() {
	// 	base_image = document.createElement('img');
	// 	base_image.src = 'images/bg-4.png';
	// 	base_image.style.width = '100%';
	// 	base_image.onload = function(){
	// 	  that.context.drawImage(base_image, this.x, this.y);
	// 	}
	// }

}


function Background(parentElement, width, height) {
	
	this.parentElement = parentElement;
	this.x1 = 0;
	this.x2 = 0;
	this.dx = -1;
	this.width = width || 500;
	this.height = height || 500;
	this.base_img = null;

	var that = this;
	
	this.init = function() {
		this.parentElement = parentElement;
		this.context = this.parentElement.getContext('2d');

		base_image = document.createElement('img');
		
		base_image.src = 'images/bg-4.png';
		base_image.style.width = '100%';
		this.base_img = base_image;

		// canvas.scale
		base_image.onload = function() {
		  that.context.drawImage(base_image, 0, 0);
		  that.x2 = base_image.width + that.dx;
		  // console.log('base image width', base_image.width);
		  // that.context.drawImage(base_image, 500, 500);
		  // console.log(that.context);
		  // var ptrn = that.context.createPattern(base_image, 'repeat'); // Create a pattern with this image, and set it to "repeat".
		  // that.context.fillStyle = ptrn;
		  // that.context.fillRect(0, 0, 500, 500); // context.fillRect(x, y, width, height);
		}
		return this;
	}

	this.moveBackground = function() {
		// moving logic
		// debugger;
		this.x1 += this.dx;
		this.x2 += this.dx;
		var base_img_width = this.base_img.width;

		if(this.x1 < -base_img_width) {
			// first image out of bound so move it to the back
			console.log('x1 out of bound x1', this.x1, 'x2',this.x2, 'width', base_img_width);
			this.x1 = this.x2 + base_img_width;
		} else if (this.x2 < -base_img_width) {
			console.log('x1 out of bound x1', this.x1, 'x2',this.x2, 'width', base_img_width);
			this.x2 = this.x1 + base_img_width;
		}

		this.context.clearRect(0, 0, 500, 500);  // clear canvas
		this.context.drawImage(this.base_img, this.x1, 0);
		this.context.drawImage(this.base_img, this.x2, 0);
	}
}
// Main --
// Initialize Canvas and get its context
var c = document.getElementById("gameArea1");
var bird = new Bird(c).init();
var background = new Background(c, 500, 500).init();


setInterval(background.moveBackground.bind(background),10 );

// Game Type

// function Game(parentElement) {
// 	this.parentElement = null;
// 	this.background = null;

// 	this.init = function() {
// 		background = new Background(c, 500, 500).init();
// 	}

// 	this.startGame = function() {
// 		// initialize game state 

// 		window.requestAnimationFrame(loop);
// 	}

// 	this.loop = function() {
// 		// move Background

// 		// loop again
// 		window.requestAnimationFrame(loop);
// 	}
// }