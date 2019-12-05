var tableContainer = null; 
var dmswitch = null ;
function init() {

	tableContainer = document.getElementById('table-container');
	dmswitch = tableContainer.getElementsByTagName('input')[0];

	if(localStorage.getItem('app-darkmode') === 'true') {
		dmswitch.checked = true;
		toggleDarkMode(dmswitch);
	}
}

function toggleDarkMode(e) {
	if(dmswitch.checked) {
		tableContainer.classList.add('dark-mode');
		localStorage.setItem('app-darkmode', 'true');
	} else {
		tableContainer.classList.remove('dark-mode');
		localStorage.setItem('app-darkmode', 'false');		
	}
}

init();