// Background Type
function Background(parentElement, width, height) {
	
	this.parentElement = parentElement;
	this.x1 = 0;
	this.x2 = 0;
	this.x = 0;
	this.dx = -1;
	this.width = width || 300;
	this.height = height || 500;
	this.base_img = null;
	this.foreground_img = null;
	this.foreground_img_height = 80;

	this.gameAreaHeight = this.height - this.foreground_img_height;

	var that = this;
	
	this.init = function() {
		this.parentElement = parentElement;
		this.context = this.parentElement.getContext('2d');

		var base_image = document.createElement('img');
		
		// base_image.src = 'images/bg-4.png';
		base_image.src = 'images/bg-4.png';
		base_image.style.width = '100%';
		this.base_img = base_image;
		
		var foreground_image = document.createElement('img');
		
		foreground_image.src = 'images/foreground.png';
		foreground_image.style.width = '100%';
		this.foreground_img = foreground_image;
		
		base_image.onload = function() {
			that.context.drawImage(base_image, 0, 0);
			// that.x2 = base_image.width + that.dx;
			// that.context.drawImage(base_image, that.x2, 0);
		}

		this.x=0;
		this.x1 = this.x+ 336//foreground_image.width;
		this.x2 = this.x1*2;

		foreground_image.onload = function() {
		 	that.context.drawImage(foreground_image,that.x, that.height - that.foreground_img_height);
		 	that.context.drawImage(foreground_image,that.x1, that.height - that.foreground_img_height);
		 	that.context.drawImage(foreground_image,that.x2, that.height - that.foreground_img_height);
		}

		return this;
	}

	// this.moveBackgroundOld = function() {
	// 	// This method moves the actual background image but required only to move foreground image
	// 	this.x1 += this.dx;
	// 	this.x2 += this.dx;
	// 	var base_img_width = this.base_img.width;

	// 	if(this.x1 < -base_img_width) {
	// 		// first image out of bound so move it to the back
	// 		// console.log('x1 out of bound x1', this.x1, 'x2',this.x2, 'width', base_img_width);
	// 		this.x1 = this.x2 + base_img_width;
	// 	} else if (this.x2 < -base_img_width) {
	// 		// console.log('x1 out of bound x1', this.x1, 'x2',this.x2, 'width', base_img_width);
	// 		this.x2 = this.x1 + base_img_width;
	// 	}

	// 	this.context.clearRect(0, 0, this.width, this.height);  // clear canvas
	// 	this.context.drawImage(this.base_img, this.x1, 0);
	// 	this.context.drawImage(this.base_img, this.x2, 0);
	// 	this.context.drawImage(this.foreground_img,0,this.height - this.foreground_img_height);
	// }

	this.moveBackground = function() {
		this.context.clearRect(0, 0, this.width, this.height);  // clear canvas
		this.context.drawImage(this.base_img, 0, 0);
		
		this.x += this.dx;
		this.x1 += this.dx;
		this.x2 += this.dx;
		var fg_img_width = this.foreground_img.width;

		if(this.x < -(fg_img_width + 3)) this.x = this.x2 + fg_img_width;  
		else if(this.x1 < -(fg_img_width + 3)) this.x1 = this.x + fg_img_width;  
		else if(this.x2 < -(fg_img_width + 3)) this.x2 = this.x1 + fg_img_width;

		this.context.drawImage(this.foreground_img, this.x, this.gameAreaHeight);
		this.context.drawImage(this.foreground_img, this.x1, this.gameAreaHeight);
		this.context.drawImage(this.foreground_img, this.x2, this.gameAreaHeight);
	}
}