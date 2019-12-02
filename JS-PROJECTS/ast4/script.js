// Car Type
function Car(parentElement) {
	// this.dx = 5;
	this.dy = 5;
	this.x = 0;
	this.y = 0;
	this.left = 50; // 50% initially ->Can only be an ENUM[20, 50, 80]
	this.width = 80;
	this.height = 160;
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
		
		this.left += 30;
		this.element.style.left = this.left + '%';
	}
}



// EnemyCar Type
function EnemyCar(parentElement, top, left, dy, carImgId) {
	this.dy = dy || 5;
	this.top = top || 0; // in px
	this.left = left || 50; // 50% initially ->Can only be an ENUM[20, 50, 80]
	this.width = 80;
	this.height = 160;
	this.element = null;
	this.parentElement = parentElement;
	var that = this;

	this.init = function() {
		
		var car = document.createElement('div');
		car.style.height = this.height + 'px';
		car.style.width = this.width + 'px';
		car.setAttribute('class', 'enemy-car');
		car.style.left = this.left + '%';
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
		keys: {
			ArrowLeft: false,
			ArrowRight: false
		},
		updateKey: function(e) {

			if(this.keys[e.key] == 'undefined') return;
			this.keys[e.key] = true;
		}
	};

	this.parentElement = parentElement;
	this.AltScreen = parentElement.querySelector('.welcome-screen'); // Alternative screen for start and end msg
	this.gameArea = parentElement.querySelector('.app');
	
	var that = this;

	this.init = function() {
		var startGame = document.querySelector('.welcome-screen');
		startGame.addEventListener('click', this.start.bind(this));
		this.AltScreen = startGame;
	}
	this.start = function() {

		// var this.gameArea = document.getElementById('app');
		
		player.car = new Car(this.gameArea);
		player.car.init();
		player.start = true;
		
		this.AltScreen.classList.add('hide');
		this.gameArea.classList.remove('hide');

		// Add Key Event Listener
		document.addEventListener('keydown', player.updateKey.bind(player));

		// Initial call for gameLoop
		window.requestAnimationFrame(this.gameLoop.bind(this));

		// Generate enemy cars
		
		for(var i=0; i < 3; i++) {
			// parentElement, top, left, dy, carImgId) {
			enemyCars[i] = new EnemyCar(
				this.gameArea,
				-(i * 330),
				(20 + getRandomNumber(0,2)*30),
				3,
				1			
			);
			enemyCars[i].init();
		}
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
		moveHighWay();
		// move enemyCars
		enemyCars.forEach(function(enemy, i){
			// Check for collision
			if(enemy.checkCollision(player.car)) {
				console.log('HIT !!');
				that.gameArea.classList.add('hide');
				that.AltScreen.classList.remove('hide');
				that.AltScreen.innerHTML = '<h2>GAME OVER</h2><h3>Score: '+ player.score + '</h3>';
				return;
			}

			enemy.moveEnemy();

			// Check if Player has passed Enemy without Hit
			if(enemy.top > 500) {
				// Passed without hit
				enemy.removeCarElement(); // remove car div form dom
				enemyCars.splice(i,1); // remove car from enemyCars array
				player.score += 20; // increase player score by 20
				// Add new Enemy Car
				enemyCars.push(
					new EnemyCar(
									that.gameArea,
									-(getRandomNumber(1, 5) * 330),
									(20 + getRandomNumber(0,2)*30),
									3,
									1			
								).init()
				);

				console.log('enemy car passed without hit score: '+ player.score);
			}

		});

		// recursive call gameLoop
		window.requestAnimationFrame(this.gameLoop.bind(this));
	}
}


var app = document.getElementById('gameArea1');
var game = new Game(app);
game.init();



// Highway Animation
function moveHighWay (speed = 5) {
	var highwayImg = document.getElementById('highwayImage');
	var topValue = parseInt(highwayImg.style.top.split('px')[0]);
	if(topValue == 0 || !topValue) topValue = -1000;
	else topValue = (topValue + speed) % 1000;
	highwayImg.style.top = topValue + 'px';
}

// Global Utility Function
function getRandomNumber ( min, max ) {
	return Math.floor(Math.random() * (max - min) + min);
}

