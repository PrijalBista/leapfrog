// GLOBALS
var IMG_WIDTH = 400;
var IMG_HEIGHT = 300;
// var currentPosition = 0;
var currentIndex = 0;

var imageWrapper = document.getElementsByClassName('carousel-image-wrapper');

var images = Array.from(imageWrapper[0].getElementsByTagName('img'));
images.forEach( function ( image, i) {
	images[i].style.left = ( i * IMG_WIDTH ) + '.px';
});


function shiftLeft() {
	// update Index
	currentIndex++;

	//handle if all images have been shown
	if( currentIndex >= (images.length)) {
		var currentPosition = IMG_WIDTH;
		currentIndex = 0;
		imageWrapper[0].style.left =  currentPosition + '.px';				
	}

	var slideInterval = setInterval(function(){
		var currentPosition = imageWrapper[0].style.left.split('px')[0];
		currentPosition = currentPosition =='' ? 0: parseInt(currentPosition);
		currentPosition -= 2;		
		imageWrapper[0].style.left =  currentPosition + '.px';		
	},10);

	setTimeout(function(){
		clearInterval(slideInterval);
	},2000);

	// 2000(2sec) ma 400px 
	// 10ms ma (400/2000)*10 = 2px;
}

function shiftRight() {
	// update Index
	currentIndex--;
	// handle if all images have been shown
	if( currentIndex < 0 ) {
		var currentPosition = -(images.length * IMG_WIDTH);
		currentIndex = images.length-1;
		imageWrapper[0].style.left =  currentPosition + '.px';				
	}

	var slideRightInterval = setInterval(function(){
		var currentPosition = imageWrapper[0].style.left.split('px')[0];
		currentPosition = currentPosition =='' ? 0: parseInt(currentPosition);
		currentPosition += 2;
		imageWrapper[0].style.left =  currentPosition + '.px';		
	},10);

	setTimeout(function(){
		clearInterval(slideRightInterval);
	},2000);
}

// setInterval(shiftRight,4000);
// setInterval(shiftLeft,3000);


// Single FUNCTION FOR BOTH

function shift(direction) {
	// update Index
	( direction === 'left') ? currentIndex-- : currentIndex++;
	// default speed calculated as
	// 2000(2sec) ma 400px
	// 10ms ma (400/2000)*10 = 2px;
	var speed = -((IMG_WIDTH/2000) * 10);
	if(direction === 'left') speed = -speed;

	//handle if all images have been shown
	if( currentIndex >= (images.length)) {
		//reset current Index
		currentIndex = 0;	
		// calculate speed
		// 2000ms ma 400*3 images
		// 10 ms ma (400*3)/2000 * 10
		speed = ( ( IMG_WIDTH*(images.length-1) ) / 2000 ) * 10;

	}

	if( currentIndex < 0 ) {
		var currentPosition = -(images.length * IMG_WIDTH);
		currentIndex = images.length-1;
		speed = -( ( IMG_WIDTH*(images.length-1) ) / 2000 ) * 10;			
	}

	var slideInterval = setInterval(function(){
		var currentPosition = imageWrapper[0].style.left.split('px')[0];
		currentPosition = currentPosition =='' ? 0: parseInt(currentPosition);
		currentPosition += speed;	
		imageWrapper[0].style.left =  currentPosition + '.px';		
	},10);

	setTimeout(function(){
		clearInterval(slideInterval);
	},2000);
}