// Box Class/Constructor Function
// ( function () {

function Box (parentElement) {
	this.x = 10;
	this.y = 10;
	this.speed = 1;
	this.width = 50;
	this.height = 50;
	this.element = null;
	this.parentElement = parentElement;
	var that = this;

	this.init = function () {

		var box = document.createElement('div');
		box.style.height = this.height + 'px';
		box.style.width = this.width + 'px';
		box.classList.add('box');
		this.parentElement.appendChild(box);
		this.element = box;
	}

	this.setPosition = function(x, y) {
		this.x = x;
		this.y = y;
	}

	this.draw = function () {
		this.element.style.left = this.x + 'px';
		this.element.style.top = this.y + 'px';
	}

	this.move = function () {

		this.x += this.speed;
		this.y += this.speed;
		this.draw();
	}

	this.checkCollision = function (boxes) {
		// this -> box whose collision is to be checked
		// boxes -> array of boxes
		// Check if this(box) collides with other boxes and set speed correspondingly
		for(var i = 0; i < boxes.length; i++) {

			// ignore checking collision with self
			if( boxes[i].x === this.x && boxes[i].y === this.y ) continue;

			// 
			// if (rect1.x < rect2.x + rect2.width &&
			   // rect1.x + rect1.width > rect2.x &&
			   // rect1.y < rect2.y + rect2.height &&
			   // rect1.y + rect1.height > rect2.y) {

			if(
				boxes[i].x < this.x + this.width &&
				boxes[i].x + boxes[i].width > this.x &&
				boxes[i].y < this.y + this.height &&
				boxes[i].y + boxes[i].height > this.y
			) {
				// collision detected
				this.speed = -this.speed;
			}

		}		
	}

}

// Game Class/Constructor Function

function Game (parentElement, boxCount) {
	
	var boxes = [];
	var MAX_WIDTH = 500;
	var MAX_HEIGHT = 500;
	this.parentElement = parentElement;
	this.boxCount = boxCount || 5;

	this.startGame = function () {
		// create number of boxes
		for ( var i = 0; i < this.boxCount; i++ ) {
			var box = new Box(parentElement);
			box.init();
			
			// Unique X,Y for preventing collision on spawn
			this.setUniqueBoxPosition(box);
			// box.setPosition(
			// 	getRandomNumber(0, MAX_WIDTH - box.width),
			// 	getRandomNumber(0, MAX_HEIGHT - box.height)
			// );
			box.draw();
			boxes.push(box);			
		}

		// Move All Boxes every 100 milli seconds
		setInterval(this.moveBoxes.bind(this), 10);
	}

	this.checkUniqueBoxPosition = function (x, y) {
		var unique = true;
		var marginLR = 10;
		var marginTB = 10;

		for (var i = 0; i < boxes.length; i++) {
			if(
				x >= (boxes[i].x - marginLR) && x <= (boxes[i].x + boxes[i].width + marginLR) &&
				y >= (boxes[i].y - marginTB) && y <= (boxes[i].y + boxes[i].height + marginTB)
				
			) {
				unique = false;
				break;
			}
		}
		return unique;
	}
	this.checkForCollision = function (x,y) {
		var unique = true;
		var marginLR = 10;
		var marginTB = 10;

		for (var i = 0; i < boxes.length; i++) {
			// if (rect1.x < rect2.x + rect2.width &&
			   // rect1.x + rect1.width > rect2.x &&
			   // rect1.y < rect2.y + rect2.height &&
			   // rect1.y + rect1.height > rect2.y) {
			if(
				boxes[i].x < x + boxes[i].width &&
				boxes[i].x + boxes[i].width > x &&
				boxes[i].y < y + boxes[i].height &&
				boxes[i].y + boxes[i].height > y
			) {
				unique = false;
				break;
			}
		}
		return unique;
	}

	this.setUniqueBoxPosition = function (box) {
		var uniqueX;
		var uniqueY;
		// var counter=0;
		while ( true ) {
			// console.log('unique check counter', counter++);
			uniqueX = getRandomNumber(0, MAX_WIDTH - box.width);
			uniqueY = getRandomNumber(0, MAX_HEIGHT - box.height);
			
			var checkUniqueTL = this.checkUniqueBoxPosition(uniqueX,uniqueY); 
			var checkUniqueTR = this.checkUniqueBoxPosition(uniqueX + box.width, uniqueY); 
			var checkUniqueBL = this.checkUniqueBoxPosition(uniqueX,uniqueY + box.height); 
			var checkUniqueBR = this.checkUniqueBoxPosition(uniqueX + box.width,uniqueY + box.height); 
			
			if(checkUniqueTL && checkUniqueTR && checkUniqueBL && checkUniqueBR) {
			// if(this.checkForCollision) {
				box.setPosition(uniqueX, uniqueY);
				break;
			}
		}
	}

	this.moveBoxes = function() {
		for( var i = 0; i < this.boxCount; i++) {

			// Handle Boundary Collision
			// x-direction
			if ( 
				boxes[i].x <= 0 || 
				boxes[i].x >= (MAX_WIDTH - boxes[i].width)
			) {
				boxes[i].speed = -boxes[i].speed;
			}
			// y-direction
			if ( 
				boxes[i].y <= 0 || 
				boxes[i].y >= (MAX_HEIGHT - boxes[i].height)
			) {
				boxes[i].speed = -boxes[i].speed;
			}

			// Check collision
			boxes[i].checkCollision(boxes);
			boxes[i].move();

		}
	}
}

// Global Utility Function
function getRandomNumber ( min, max ) {
	return Math.random() * (max - min) + min;
}


// Main
var parentElement = document.getElementById('app');

new Game(parentElement).startGame();

// })();



// function Game (parentElement, boxCount) {
// 	var boxes = [];

// 	var MAX_WIDTH = 500;
// 	var MAX_HEIGHT = 500;
// 	this.parentElement = parentElement;
// 	this.boxCount = boxCount || 10;

// 	this.startGame = function () {}
// 	this.moveBoxes = function () {}
// }