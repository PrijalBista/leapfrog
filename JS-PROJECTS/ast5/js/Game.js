// Game Type
function Game(parentElement, keyBinding) {

	this.parentElement = null;
	this.gameCanvas = null;
	this.background = null;
	this.highScore = null;
	this.pipes = [];
	this.keyBinding = keyBinding || ' ';
	this.player = {
		bird: null,
		score: 0,
		keyPressed: false,
	}
	this.state = {
		current: 0,
		ready: 0,
		game: 1,
		over: 2
	}
	this.frame = 0;
	this.pipeGenerateCountdown = 100;
	var that = this;

	this.init = function() {
		
		this.parentElement = parentElement;
		this.gameCanvas = parentElement.querySelector('.gameArea');
		this.context = this.gameCanvas.getContext('2d');

		this.background = new Background(this.gameCanvas, 300, 500).init();
		
		this.player.bird = new Bird(
			this.gameCanvas,
			this.background.gameAreaHeight
			).init();
		this.player.score = 0;

		// load GetReady Image
		var startImg = document.createElement('img');
		startImg.src = 'images/message.png';
		startImg.style.width = '100%';
		this.startImg = startImg;

		// load Game Over Image
		var gameOverImg = document.createElement('img');
		gameOverImg.src = 'images/gameover.png';
		gameOverImg.style.width = '100%';
		this.gameOverImg = gameOverImg;
		this.loadHighScore();
		// this.gameCanvas.addEventListener('keydown', this.updateKeyPress.bind(this));
		document.addEventListener('keydown', this.updateKeyPress.bind(this));
		// add click /tap support
		this.gameCanvas.addEventListener('click', function() { that.updateKeyPress({key: that.keyBinding})});
		// Start Game Loop
		this.startGame();

	}

	this.updateKeyPress = function(e) {
		
		// if(e.key !== ' ') return;
		if(e.key !== this.keyBinding) return;

		if(this.state.current === this.state.ready) {
			this.state.current = this.state.game;
			return;
		} else if (this.state.current === this.state.over) {
			this.pipes = [];
			this.player.score = 0;
			this.pipeGenerateCountdown = 100;
			this.state.current = this.state.ready;
		}
		// this.keyPressed = !this.keyPressed;
		this.keyPressed = true;
	}
	
	this.startGame = function() {
		// initialize game state 
		console.log('startGame');
		this.state.current = this.state.ready;
		window.requestAnimationFrame(this.loop.bind(this));
	}

	this.loop = function() {

		if(this.state.current === this.state.game) {
			// move Background
			this.background.moveBackground();

			if(this.keyPressed) {
				this.player.bird.flap();
				this.keyPressed = false;
			}

			// Move
			this.player.bird.move(this.state, this.frame);

			//Generate pipe
			if(this.pipeGenerateCountdown <= 0) {
				// console.log('generate new pipe');
				this.pipes.push(new Pipe(
					this.gameCanvas,
					this.background.width, 
					this.background.gameAreaHeight, 
					this.player.bird.height
					).init()
				);
				// reset pipeGenerateCountdown to 120-160 (optimal)
				this.pipeGenerateCountdown = getRandomNumber(120, 250);
			}

			// Move pipes
			for(var i = this.pipes.length-1; i>=0; i--) {

				// increase score if surpase pipe without collision
				if(this.pipes[i].getScore===true && this.pipes[i].x + this.pipes[i].width < this.player.bird.x-this.player.bird.width) {
					this.player.score++;
					this.pipes[i].getScore = false;
					this.pipes[i].move(this.state, this.player.bird);
				}
				// remove pipes that have moved out of the canvas
				else if(this.pipes[i].x + this.pipes[i].width < 0) this.pipes.splice(i,1);
				// move pipe
				else this.pipes[i].move(this.state, this.player.bird);

			}
			// this.pipes.forEach(function(pipe) { pipe.move(that.player.bird)});

		}else if (this.state.current === this.state.ready) {
			// move Background
			this.background.moveBackground();
			this.player.bird.move(this.state, this.frame);
			this.readyScreen();
		
		} else {
			// game over state
			this.gameOverScreen();
			this.player.bird.move(this.state, this.frame);
		}

		this.frame ++;
		this.pipeGenerateCountdown--;
		this.writeScore();
		// loop again
		window.requestAnimationFrame(this.loop.bind(this));
	}

	this.writeScore = function() {
		// this.context.font = "30px Comic Sans MS";
		this.context.font = "20px Arial";
		this.context.fillStyle = "#000";
		this.context.textAlign = "center";
		this.context.fillText(this.player.score, this.background.width/2, 30);
		this.context.fillText('HIGHSCORE: '+this.highScore, this.background.width/2, this.background.height-30);	
	}

	this.readyScreen = function() {
		this.context.drawImage(
			this.startImg,
			this.background.width/2 - this.startImg.width/2,
			50
		);

		this.context.font = "20px Arial";
		this.context.fillStyle = "#000";
		this.context.textAlign = "center";
		var msg = (this.keyBinding ===' ')?'space':this.keyBinding;
		this.context.fillText('Press "'+ msg + '" To Jump', this.background.width/2, 300); 
		this.context.fillText('Click/Tap(mobile) also Works', this.background.width/2, 320); 
	}

	this.gameOverScreen = function() {
		this.context.drawImage(
			this.gameOverImg,
			this.background.width/2 - this.startImg.width/2,
			50
		);

		if(this.player.score > this.highScore) {
			this.context.font = "20px Arial";
			this.context.fillStyle = "#eee";
			this.context.textAlign = "center";
			this.context.fillText('HighScore !', this.background.width/2, 50);
			this.highScore = this.player.score;
			localStorage.setItem('flappyBirdHighScore', this.highScore);
			this.loadHighScore();
		}
	}
	this.loadHighScore = function() {
		var hs = localStorage.getItem('flappyBirdHighScore');
		this.highScore = hs ? hs : 0;
	}
}


// Global Utility Function
function getRandomNumber ( min, max ) {
	return Math.floor(Math.random() * (max - min) + min);
}