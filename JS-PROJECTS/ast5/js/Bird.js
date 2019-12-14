// Bird Type
function Bird(parentElement, gameAreaHeight) {
	// Bird image width height  = 240 x 202
	this.parentElement = null;
	this.element = null;
	this.x = 0;
	this.y = 0;
	this.width = 40;
	this.height = 34;
	this.dy = 0;
	this.gravity = 0.25;
	this.jump = 5;
	this.flapPeriod = 0;
	this.images_src = ['images/bird/bd.png', 'images/bird/bm.png', 'images/bird/bu.png'];
	this.images  = [];
	this.birdImageCounter = 0;
	this.gameAreaHeight = null;
	this.rotation = 0;
	this.DEGREE = Math.PI/180;
	this.context;

	var that = this;

	this.init = function() {


		this.parentElement = parentElement;
		this.context = this.parentElement.getContext('2d');
		this.gameAreaHeight = gameAreaHeight;
		// Load and ready 3 state images of flappy bird
		this.images_src.forEach(function(src) {
			var image = document.createElement('img');
			image.src = src;
			image.style.width = '100%';

			that.images.push(image);
		});

		this.images.push(this.images[1]);
		
		// // Render first image bird unflapped
		// this.images[0].onload = function() {
		// 	that.draw(that.images[0]);
		// 	// that.context.drawImage(image1, that.x, that.y, that.width, that.height);
		// };

		return this;
	}

	this.draw = function() {
		this.context.save();
		// console.log('this.x',this.x,'this.y', this.y);
		this.context.translate(this.x, this.y);
		this.context.rotate(this.rotation);
		this.context.drawImage(this.images[this.birdImageCounter],this.width / 2 * (-1), this.height / 2 * (-1), this.width, this.height);
		this.context.restore();
	}

	this.flap = function() {
		this.dy = -this.jump;
	}

	this.move = function(state, frame) {

		this.flapPeriod = state.current === state.ready ? 10 : 5;
		this.birdImageCounter += (frame % this.flapPeriod === 0)? 1:0;
		this.birdImageCounter = this.birdImageCounter % this.images.length;

		if(state.current === state.ready) {
			this.x = parentElement.width/2 - this.width;
			this.y = parentElement.height/2;
			this.rotation = 0 * this.DEGREE;
		}else if(state.current === state.game){
			this.dy += this.gravity;
			this.y += this.dy;

			// collision detection from ground
			if(this.y + this.height/2 >= this.gameAreaHeight) {
				console.log('vui ma thokyo')
				this.y = this.gameAreaHeight-this.height/2;
				// change game state to over
				if(state.current === state.game)
					state.current = state.over;

			}

			if(this.dy >=this.jump) {
				// console.log('down',this.dy);
				this.rotation = 90 * this.DEGREE;
				this.birdImageCounter = 1;
			} else {
				this.rotation = -25 * this.DEGREE;
			}
		}
		this.draw();
	}


}