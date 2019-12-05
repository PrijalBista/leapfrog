
function HelixAnimation(canvasElement) {

	this.parentElement = null;
	this.context = null;
	this.frame = 0;
	this.width = 0;
	this.height = 0;
	this.speed = 0.02;
	this.phase = 0;
	this.maxCircleRadius = 20;
	this.rows = 10;
	this.cols = 15;
	this.color1 = [253, 174, 120];
	this.color2 = [226, 129, 161];
	this.numStrands = 2;

	this.init = function() {
		// Initializations
		this.parentElement = canvasElement;
		this.context = this.parentElement.getContext('2d');
		this.frame = 0;
		this.width = this.parentElement.width;
		this.height = this.parentElement.height;
		// for(var i = 0; i < 5; i++) console.log(this.interPolateColor(0.1));
		// Start the Animation loop
		window.requestAnimationFrame(this.loop.bind(this));
		return this;
	}

	this.loop = function() {
		// Clear Previous paint in canvas
		this.clearScreen();

		this.phase = this.frame * this.speed;

		for(var strand = 0; strand < this.numStrands; strand++) {

			// Strand Phase = phase + (strand(0-1) mapped to(0-2PI) ) 
			var strandPhase = this.phase + strand * (2*Math.PI)/this.numStrands;

			for(var i = 0; i < this.cols; i++) {
				
					var width_per_column = (this.width - 2*50)/this.cols;
					var x = (i+1)*width_per_column;
					// column offset mapped form (0-numberofCols) to (0-PI)
					var colOffset = i * (Math.PI/this.cols);

				for(var j = 0; j < this.rows; j++) {
				
					var y = this.height/3 + j*30 +Math.sin(strandPhase + colOffset) * 100;
					
					var sizeOffset = (Math.cos(strandPhase - j/this.rows + colOffset) + 1) * 0.5;

					var circleRadius = sizeOffset * this.maxCircleRadius;
					this.DrawCircle(x, y, circleRadius, this.interPolateColor(j/this.rows));
				}
			}		
		}

		// increase frame count and rerun loop
		this.frame++;
		window.requestAnimationFrame(this.loop.bind(this));
	}

	this.clearScreen = function() {
		this.context.clearRect(0, 0, this.width, this.height);
		// Draw Background
		this.context.fillStyle = 'rgb(4, 58, 74)';
		this.context.fillRect(0,0,this.width,this.height);
	}

	this.interPolateColor = function(amount) {
		// amount 0-1
		var result = [];
		for(var i = 0; i < this.color1.length; i++) {
			var c1 = this.color1[i];
			var c2 = this.color2[i];
			result[i] = c1 + (c2 - c1)*amount;
			result[i] = Math.floor(result[i]);
		}
		return result;
	}

	this.DrawCircle = function (x,y,r, color) {
		this.context.fillStyle = 'rgb('+color[0]+', '+color[1]+', '+color[2]+')';
		this.context.beginPath();
		this.context.arc(x,y,r,0,2*Math.PI); 
		this.context.closePath();
		this.context.fill();
	}

}

// Instance 1
var c = document.getElementById("helix");
var helixanim = new HelixAnimation(c).init();
// Instance 2
var c2 = document.getElementById("helix2");
var helixanim2 = new HelixAnimation(c2).init();
