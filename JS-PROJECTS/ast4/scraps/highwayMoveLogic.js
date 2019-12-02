
// Highway Animation
function moveHighWay () {
	var highwayImg = document.getElementById('highwayImage');
	var topValue = parseInt(highwayImg.style.top.split('px')[0]);
	if(topValue == 0 || !topValue) topValue = -1000;
	else topValue = (topValue + 5) % 1000;
	highwayImg.style.top = topValue + 'px';
}

// setInterval(moveHighWay, 10);