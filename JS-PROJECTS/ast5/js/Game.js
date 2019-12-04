// Game Type
function Game(parentElement) {

	this.parentElement = null;
	this.gameCanvas = null;
	this.background = null;

	this.pipes = [];

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
	var that = this;

	this.init = function() {
		
		this.parentElement = parentElement;
		this.gameCanvas = parentElement.querySelector('.gameArea');

		this.background = new Background(this.gameCanvas, 500, 500).init();
		
		this.player.bird = new Bird(this.gameCanvas,this.background.height).init();
		this.player.score = 0;

		// this.parentElement.focus();

		// console.log('gamecanvas', this.gameCanvas);
		// this.parentElement.addEventListener('keydown', this.updateKeyPress.bind(this));
		document.addEventListener('keydown', this.updateKeyPress.bind(this));

		// Start Game Loop
		this.startGame();

	}

	this.updateKeyPress = function(e) {
		
		if(e.key !== ' ') return;

		if(this.state.current === this.state.ready) {
			this.state.current = this.state.game;
			return;
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
		// move Background
		this.background.moveBackground();

		if(this.state.current === this.state.game) {
			if(this.keyPressed) {
				this.player.bird.flap();
				this.keyPressed = false;
			}

			// Move
			this.player.bird.move(this.state, this.frame);

			//Generate pipe
			if(this.frame % 120 === 0) {
				console.log('generate new pipe');
				this.pipes.push(new Pipe(
					this.gameCanvas,
					this.background.width, 
					this.background.height, 
					this.player.bird.height
					).init()
				);
			}

			// Move pipes
			for(var i = this.pipes.length-1; i>=0; i--) {
			// 	// remove pipes that have moved out of the canvas
				// console.log('foreach pipe', this.pipes[i].x);
				if(this.pipes[i].x + this.pipes[i].width < 0) this.pipes.splice(i,1);
				else this.pipes[i].move(this.player.bird);

			}
			// this.pipes.forEach(function(pipe) { pipe.move(that.player.bird)});

		}else if (this.state.current === this.state.ready) {
			this.player.bird.move(this.state, this.frame);
		
		} else {
			// game over state
			this.player.bird.move(this.state, this.frame);
		}

		this.frame ++;
		// loop again
		window.requestAnimationFrame(this.loop.bind(this));
	}
}