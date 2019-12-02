// Car Type
function Car(parentElement) {
	// this.dx = 5;
	this.dy = 5;
	this.x = 0;
	this.y = 0;
	this.left = 50; // 50% initially ->Can only be an ENUM[20, 50, 80]
	this.width = 50;
	this.height = 80;
	this.element = null;
	this.parentElement = parentElement;
	var that = this;

	this.init = function() {
		
		var car = document.createElement('div');
		car.style.height = this.height + 'px';
		car.style.width = this.width + 'px';
		car.setAttribute('class', 'player-car');
		car.style.left = this.left + '%';
		var carImg = document.createElement('img');
		carImg.src = 'images/cars/car-1.png';
		carImg.style.width = '100%';

		car.appendChild(carImg);
		this.element = car;
		this.parentElement.appendChild(car);
		// this.x = car.offsetLeft;
		// this.y = car.offsetTop;
	}

	this.moveLeft = function() {
		// check boundary condition
		if(this.left <= 20) { this.left = 20; return;}
		
		this.left -= 30;
		this.element.style.left = this.left + '%';
	}

	this.moveRight = function() {

		if(this.left >= 80) {this.left = 80; return;}
		
		// this.element.style.transform = 'rotate(50deg)';

		this.left += 30;
		this.element.style.left = this.left + '%';

		// this.element.style.transform = 'rotate(0)';

	}
}



// EnemyCar Type
function EnemyCar(parentElement, top, left, dy, carImgId) {
	this.dy = dy || 2;
	this.top = top; // in px
	this.left = left || 50; // 50% initially ->Can only be an ENUM[20, 50, 80]
	this.width = 50;
	this.height = 80;
	this.element = null;
	this.parentElement = parentElement;
	var that = this;

	this.init = function() {
		
		var car = document.createElement('div');
		car.style.height = this.height + 'px';
		car.style.width = this.width + 'px';
		car.setAttribute('class', 'enemy-car');
		car.style.left = this.left + '%';
		car.style.top = this.top + 'px';
		var carImg = document.createElement('img');
		carImg.src = 'images/cars/car-'+carImgId+'.png';
		carImg.style.width = '100%';

		car.appendChild(carImg);
		this.element = car;
		this.parentElement.appendChild(car);
		return this;
	}

	this.moveEnemy = function() {
		// check position
		this.top += dy;
		this.element.style.top = this.top + 'px';
	}

	this.checkCollision = function(playerCar) {

		var car1 = this.element.getBoundingClientRect();
		var car2 = playerCar.element.getBoundingClientRect();
		
		return (
			car1.x < car2.x + car2.width &&
			car1.x + car1.width > car2.x &&
			car1.y < car2.y + car2.height &&
			car1.y + car1.height > car2.y
		);
	}

	this.removeCarElement = function() {

		this.element.remove();
	}

}

// Game type
function Game(parentElement) {
	
	var enemyCars = [];
	
	var player = {
		car: null,
		score: 0,
		start: false,
		speed : 2,
		enemyDestroyCounter: 0,
		keys: {
			ArrowLeft: false,
			ArrowRight: false
		},
		updateKey: function(e) {

			if(this.keys[e.key] == 'undefined') return;
			this.keys[e.key] = true;
		}
	};

	this.highScore = {
		name: 'unknown',
		score: 0
	};
	
	this.parentElement = parentElement;
	this.AltScreen = parentElement.querySelector('.welcome-screen'); // Alternative screen for start and end msg
	this.gameArea = parentElement.querySelector('.app');
	this.highway = null;
	this.gameCounter = 0;

	var that = this;

	this.init = function() {
		var startGame = document.querySelector('.welcome-screen');
		startGame.addEventListener('click', this.start.bind(this));
		this.AltScreen = startGame;
		// get previous highscore if exists
		this.highScore = localStorage.getItem('carGameHighScore')? 
							JSON.parse(localStorage.getItem('carGameHighScore')) : 
							this.highScore;

		this.highway = new HighWay(this.gameArea);
	}

	this.start = function() {

		// var this.gameArea = document.getElementById('app');
		
		player.car = new Car(this.gameArea);
		player.car.init();
		player.start = true;
		
		this.AltScreen.classList.add('hide');
		this.gameArea.classList.remove('hide');

		this.highway.init();

		// Add Key Event Listener
		document.addEventListener('keydown', player.updateKey.bind(player));

		// Initial call for gameLoop
		window.requestAnimationFrame(this.gameLoop.bind(this));

	}


	this.gameLoop = function() {

		if(player.keys.ArrowLeft) {
			player.keys.ArrowLeft = false;
			player.car.moveLeft();
		}

		if(player.keys.ArrowRight) {
			player.keys.ArrowRight = false;
			player.car.moveRight();
		}

		// move highway
		this.highway.moveHighWay();
		// move enemyCars
		var hitFlag = false;

		enemyCars.forEach(function(enemy, i){
			// Check for collision
			if(enemy.checkCollision(player.car)) {
				
				console.log('HIT !!');
				
				enemy.element.style.transform = 'rotate(20deg)';
				player.car.element.style.transform = 'rotate(-20deg)';
				console.log('GameOVER score: ',player.score);
				// that.gameArea.classList.add('hide');
				// that.AltScreen.classList.remove('hide');
				// that.AltScreen.innerHTML = '<h2>GAME OVER</h2><h3>Score: '+ player.score + '</h3>';
				// if new HighScore then set new highscore
				if(player.score > that.highScore.score) {
					that.highScore.score = player.score;
					// persistant storage
					localStorage.setItem('carGameHighScore', JSON.stringify(that.highScore));
				}
				hitFlag = true;
				return;
			}

			enemy.moveEnemy();

			// Check if Player has passed Enemy without Hit
			if(enemy.top > 500 + 50) {
				// Passed without hit
				enemy.removeCarElement(); // remove car div form dom
				enemyCars.splice(i,1); // remove car from enemyCars array
				player.score += 20; // increase player score by 20
				player.enemyDestroyCounter++;

				console.log('enemy car passed without hit score: '+ player.score);

				// If player passes 5 enemy cars increase the speed by 1
				if(player.enemyDestroyCounter > 0 && player.enemyDestroyCounter % 5 == 0) {
					player.speed += 2;

					console.log('speed increased', player.speed);
					enemyCars.forEach(function(el){el.dy = player.speed;});
					// console.log(enemyCars);
				}
			}
		});

		// After Certain Time period respawn new enemy cars
		// 60 FPS
		if(this.gameCounter % 120 === 0) {
			// Add new Enemy Car
			enemyCars.push(
				new EnemyCar(
								that.gameArea,
								-330,
								(20 + getRandomNumber(0,2)*30),
								player.speed,
								getRandomNumber(1,3)
							).init()
			);
		}

		// recursive call gameLoop
		if(!hitFlag) {
			this.gameCounter++;
			// setTimeout(function() {
				window.requestAnimationFrame(that.gameLoop.bind(that));
			// },1000/60);
		};
	}
}


var app = document.getElementById('gameArea1');
var game = new Game(app);
game.init();



// Highway Type
function HighWay(parentElement) {

	this.parentElement = parentElement;
	this.element = null;
	this.y1 = 0;
	this.y2 = 0;
	this.images = null;
	
	var imgDimensions = null;

	this.init = function() {
		this.images = this.parentElement.getElementsByClassName('highway-image');

		imgDimensions = this.images[0].getBoundingClientRect();

		this.y2 = -imgDimensions.height;

		this.images[1].style.top = this.y2 + 'px';

		return this;
	}

	this.moveHighWay  = function(speed = 5) {

		if(this.y1 > 600){
			this.y1 = this.y2 - (imgDimensions.height-5) ;
		} else {

			this.y1 += speed;
		}

		if(this.y2 > 600){
			this.y2 = this.y1 - (imgDimensions.height-5);
		} else {
			this.y2 += speed;
		}

		this.images[0].style.top = this.y1 + 'px';
		this.images[1].style.top = this.y2 + 'px';
	}
}

// Global Utility Function
function getRandomNumber ( min, max ) {
	return Math.floor(Math.random() * (max - min) + min);
}