// Pipe Type
function Pipe(parentElement, gameAreaWidth, gameAreaHeight, birdHeight) {
	
	this.x = 0; // Pipesa have same x
	this.dx = 1;
	this.y1 = 0;
	this.y2= 0;
	// this.height = 220;
	this.height = gameAreaHeight;
	this.width = 52;
	this.gameAreaWidth = 0;
	this.gameAreaHeight = 0;
	this.birdHeight = 0;
	this.pipe1 = null;
	this.pipe2 = null;
	var that = this;

	this.init = function() {
		this.parentElement = parentElement;
		this.context = this.parentElement.getContext('2d');

		this.gameAreaWidth = gameAreaWidth;
		this.gameAreaHeight = gameAreaHeight;
		this.birdHeight = birdHeight;


		var pipe_image = document.createElement('img');
		
		// pipe_image.src = 'images/bg-4.png';
		pipe_image.src = 'images/pipeg.png';
		pipe_image.style.width = '100%';
		this.pipe1 = pipe_image;



		var pipe_image2 = document.createElement('img');
		
		// pipe_image.src = 'images/bg-4.png';
		pipe_image2.src = 'images/pipegi.png';
		pipe_image2.style.width = '100%';
		this.pipe2 = pipe_image2;

		// pipe_image.onload = function() {
		// 	that.draw();
		// }
		// get random height for first pipe
		this.y1 = getRandomNumber(20, this.gameAreaHeight-20);
		this.y2 = -(this.y1 + 50);
		// this.y2 = 0;
		this.x = this.gameAreaWidth;
		this.draw();

		console.log('New pipe x',this.x, 'y1',this.y1, 'pipe y2',this.y2);
		return this;
	}

	this.draw = function() {
		// console.log('drawing pipe x',this.x,' y',this.y1);
		// this.context.drawImage(this.images[this.birdImageCounter],this.width / 2 * (-1), this.height / 2 * (-1), this.width, this.height);
		this.context.drawImage(this.pipe1, this.x, this.y1, this.width, this.gameAreaHeight);
		// this.context.drawImage(this.pipe2, this.x, this.y2, this.width, this.gameAreaHeight);
		// this.context.drawImage(this.images[this.birdImageCounter],this.width / 2 * (-1), this.height / 2 * (-1), this.width, this.height);
	}


	this.move = function(bird) {
		// collision check
		if(bird.x+bird.width/2 > this.x
			&& bird.x - bird.width/2 < this.x + this.width 
			&& bird.y + bird.height/2 > this.y1
			) {

			console.log('colision  pipe ma ');
			console.log('bird x y',bird.x, bird.y);
			console.log('pipe x y',this.x, this.y1);
			debugger;
		}
		this.x -= this.dx;
		this.draw();
	}
}

// Global Utility Function
function getRandomNumber ( min, max ) {
	return Math.floor(Math.random() * (max - min) + min);
}
