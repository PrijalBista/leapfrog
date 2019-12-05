var tableContainer = document.getElementById('table-container');

function toggleDarkMode(e) {
	if(e.target.checked) {
		tableContainer.classList.add('dark-mode');
	} else {
		tableContainer.classList.remove('dark-mode');
	}
}