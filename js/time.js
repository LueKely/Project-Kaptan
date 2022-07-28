const dayTime = document.querySelector('.time1');
const currentTime = document.querySelector('.time__currently');
const amPm = document.getElementById('am-pm');

function getDayTime() {
	let date = new Date();
	let hours = date.getHours();

	if (hours >= 6 && hours < 12) {
		dayTime.children[0].textContent = 'Morning';
	} else if (hours >= 12 && hours < 17) {
		dayTime.textContent = 'Afternoon';
	} else if (hours >= 17 && hours < 22) {
		dayTime.textContent = 'evening';
	} else if (hours >= 22 || hours <= 6) {
		dayTime.textContent = 'night';
	} else {
		dayTime.textContent = 'error';
	}
	getBackground(hours);
}

function getBackground(time) {
	if (time < 17) {
		document.body.classList.add('day');
	} else document.body.classList.add('night');
}

function getAmPm() {
	let date = new Date();
	let hours = date.getHours();

	hours >= 12 ? (amPm.textContent = ' pm') : (amPm.textContent = ' am');
}
function getHourAndMinutes() {
	let date = new Date();
	let minutes = date.getMinutes();
	let hours = date.getHours();

	hours > 12 ? (hours = hours - 12) : (hours = hours);
	minutes < 10 ? (minutes = '0' + minutes) : (minutes = minutes);
	currentTime.textContent = hours + ':' + minutes;
}
function getTime() {
	getAmPm();
	getDayTime();
	getHourAndMinutes();
	setTimeout(getTime, 1000);
}
getTime();
