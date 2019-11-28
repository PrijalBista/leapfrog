// OOP Carousel

function Carousel (carouselContainer) {

	var that = this;

	var IMG_WIDTH = 400;
	var IMG_HEIGHT = 300;

	var currentIndex = 0;

	var imageWrapper = carouselContainer.getElementsByClassName('carousel-image-wrapper');
	
	var images = Array.from(imageWrapper[0].getElementsByTagName('img'));

	var intervals = [];
	
	var nav = null;

	this.positionImages = function () {
		
		images.forEach( function ( image, i) {
			image.style.left = ( i * IMG_WIDTH ) + '.px';
		});
	}

	this.slide = function (direction) {
		var totalTime = 400;
		var intervalSpeed = 10;
		// update Index
		( direction === 'left') ? currentIndex-- : currentIndex++;
		// default speed calculated as
		var speed = -((IMG_WIDTH/totalTime) * 10);
		if(direction === 'left') speed = -speed;

		// handle if all images have been shown
		if( currentIndex >= (images.length)) {
			//reset current Index
			currentIndex = 0;	
			// calculate speed
			speed = ( ( IMG_WIDTH*(images.length-1) ) / totalTime ) * 10;
		}

		if( currentIndex < 0 ) {
			var currentPosition = -(images.length * IMG_WIDTH);
			currentIndex = images.length-1;
			speed = -( ( IMG_WIDTH*(images.length-1) ) / totalTime ) * 10;			
		}
		if( intervals.length > 0 ) clearAllIntervals();

		var imageWidthCounter = 1;
		
		var slideInterval = setInterval( function() {
			var currentPosition = imageWrapper[0].style.left.split('px')[0];
			currentPosition = currentPosition =='' ? 0: parseInt(currentPosition);
			currentPosition += speed;
			imageWrapper[0].style.left =  currentPosition + 'px';
			
			if( imageWidthCounter === Math.floor(totalTime/intervalSpeed) ){
				// console.log('sakiyo imageWidthCounter',imageWidthCounter);
				clearInterval(slideInterval);
				that.displayIndicators();
				// defaultSlideFunction();
			}
			imageWidthCounter++;
		}, 10);
	}

	this.clearAllIntervals = function () {
		this.intervals.forEach(function(interval){clearInterval(interval)});
		this.intervals = [];
	}

	this.defaultSlideFunction = function () {
		intervals.push( setInterval( function() { shift('right') },3000 ) );
	}

	this.init = function () {
		this.positionImages();
		this.displayNavigators();
		this.displayIndicators();
	}

	this.displayNavigators = function () {
		// create and add navigators 
		nav = document.createElement('div');
		nav.setAttribute('class', 'navigator');
		nav.style.width = '100%';
		nav.style.height = '100%';
		nav.style.position = 'absolute';
		nav.style.top = '0';
		nav.style.backgroundColor = 'rgba(0,0,0,0.3)';

		var leftNavButton = document.createElement('a');
		leftNavButton.href = '';
		leftNavButton.addEventListener('click', function (e){ e.preventDefault(); that.slide('left'); });
		leftNavButton.innerHTML = '<img src="images/arrow-left.png" width="20px"/>';
		leftNavButton.style.position = 'absolute';
		leftNavButton.style.top = '42%';
		leftNavButton.style.left = '2%';
		nav.appendChild(leftNavButton);

		var rightNavButton = document.createElement('a');
		rightNavButton.href = '';
		rightNavButton.addEventListener('click', function (e){ e.preventDefault(); that.slide('right'); });
		rightNavButton.innerHTML = '<img src="images/arrow-right.png" width="20px"/>'
		rightNavButton.style.position = 'absolute';
		rightNavButton.style.top = '42%';
		rightNavButton.style.right ='2%';

		nav.appendChild(rightNavButton);

		carouselContainer.appendChild(nav);
	}

	this.displayIndicators = function () {
		// remove previous indicators if exist
		var prevIndicatorContainer = document.getElementById('indicatorContainer');
		if (prevIndicatorContainer) prevIndicatorContainer.remove();
		// indicators
		var indicatorContainer = document.createElement('div');
		indicatorContainer.setAttribute('id', 'indicatorContainer');
		indicatorContainer.style.textAlign = 'center';
		indicatorContainer.style.position = 'absolute';
		indicatorContainer.style.width = '100%';
		indicatorContainer.style.bottom = '2%';

		var ul = document.createElement('ul');
		ul.setAttribute('class', 'indicators');
		ul.style.listStyle = 'none';
		for (var i =0; i< images.length; i++) {
			var li = document.createElement('li');
			li.style.backgroundColor = 'rgba(255,255,255,0.3)';
			li.style.height= '5px';
			li.style.width = '5px';
			li.style.borderRadius = '50%';
			li.style.display ='inline-block';
			if(i!==0) li.style.marginLeft='2%';

			// highlight indicator for current displayed image
			if(currentIndex === i) {
				li.style.backgroundColor = 'rgba(255,255,255,0.7)';
			}
			ul.appendChild(li);
		}
		indicatorContainer.appendChild(ul);
		nav.appendChild(indicatorContainer);
	}

}


var carouselContainers = Array.from(document.getElementsByClassName('carousel-container'));
carouselContainers.forEach( function (carousel) {
	new Carousel( carousel ).init();
});
