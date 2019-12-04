// Background Type
function Background(parentElement, width, height) {
	
	this.parentElement = parentElement;
	this.x1 = 0;
	this.x2 = 0;
	this.dx = -1;
	this.width = width || 300;
	this.height = height || 500;
	this.base_img = null;

	var that = this;
	
	this.init = function() {
		this.parentElement = parentElement;
		this.context = this.parentElement.getContext('2d');

		var base_image = document.createElement('img');
		
		// base_image.src = 'images/bg-4.png';
		base_image.src = 'images/bg-4.png';
		base_image.style.width = '100%';
		this.base_img = base_image;
		base_image.onload = function() {
		  that.context.drawImage(base_image, 0, 0);
		  that.x2 = base_image.width + that.dx;
		  // that.context.drawImage(base_image, that.x2, 0);  
		}
		return this;
	}

	this.moveBackground = function() {

		this.x1 += this.dx;
		this.x2 += this.dx;
		var base_img_width = this.base_img.width;

		if(this.x1 < -base_img_width) {
			// first image out of bound so move it to the back
			// console.log('x1 out of bound x1', this.x1, 'x2',this.x2, 'width', base_img_width);
			this.x1 = this.x2 + base_img_width;
		} else if (this.x2 < -base_img_width) {
			// console.log('x1 out of bound x1', this.x1, 'x2',this.x2, 'width', base_img_width);
			this.x2 = this.x1 + base_img_width;
		}

		this.context.clearRect(0, 0, 500, 500);  // clear canvas
		this.context.drawImage(this.base_img, this.x1, 0);
		this.context.drawImage(this.base_img, this.x2, 0);
	}
}