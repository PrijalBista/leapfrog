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

}

var startGame = document.querySelector('.welcome-screen');
startGame.addEventListener('click', start);


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

var enemyCars = [];

function start() {

	var gameArea = document.getElementById('app');
	
	player.car = new Car(gameArea);
	player.car.init();
	player.start = true;
	
	startGame.classList.add('hide');
	gameArea.classList.remove('hide');

	// Add Key Event Listener
	document.addEventListener('keydown', player.updateKey.bind(player));

	// Initial call for gameLoop
	window.requestAnimationFrame(gameLoop);

	// Generate enemy cars
	
	for(var i=0; i < 3; i++) {
		// parentElement, top, left, dy, carImgId) {
		enemyCars[i] = new EnemyCar(
			gameArea,
			-(i * 330),
			(20 + getRandomNumber(0,2)*30),
			3,
			1			
		);
		enemyCars[i].init();
	}

}

function gameLoop() {

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
	enemyCars.forEach(function(enemy){
		// Check for collision
		if(enemy.checkCollision(player.car)) {
			console.log('HIT !!');
		}

		enemy.moveEnemy();
	});

	// recursive call gameLoop
	window.requestAnimationFrame(gameLoop);
}



// Highway Animation
function moveHighWay () {
	var highwayImg = document.getElementById('highwayImage');
	var topValue = parseInt(highwayImg.style.top.split('px')[0]);
	if(topValue == 0 || !topValue) topValue = -1000;
	else topValue = (topValue + 5) % 1000;
	highwayImg.style.top = topValue + 'px';
}

// Global Utility Function
function getRandomNumber ( min, max ) {
	return Math.floor(Math.random() * (max - min) + min);
}
