const url =
	'https://api.open-meteo.com/v1/forecast?latitude=14.52&longitude=121.05&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FSingapore';

const weekdayNum = document.querySelectorAll('.weekday__item');
const curTemp = document.querySelectorAll('.temptoday__item');
const curMon = document.querySelector('.month__item');
const todayDate = document.querySelectorAll('.today__word');
const weatherForecast = document.querySelectorAll('.character__sprite');
const maxTemp = document.querySelectorAll('.mmtemp__max');
const minTemp = document.querySelectorAll('.mmtemp__min');
const loadingScreen = document.querySelector('.load--container');
const morgana_speak = {
	rainy:
		"I hope you brought an umbrella joker, it's gonna be a wet one. A storm is a brewin'.",
	sunny:
		" Wooh~ it's blazing hot, let's go drop by the closest convinient store and grab us something cool to drink.",
	cloudy:
		"Hmmphh.. it's pretty cloudy today am i right joker? Did you know? Clouds can go up to 60,000 feet (18288 m) high in the sky. ",
};
let speak = '';
// gets all the next 3 days
const allDays = fetch('./json/weathertemp.json').then((response) => {
	response.json().then((result) => {
		for (let index = 1; index < 4; index++) {
			if (date.getDay() + index == 1) {
				todayDate[index].classList.add('monday');
			} else {
				todayDate[index].classList.remove('monday');
			}
			todayDate[index].innerHTML = result[output(index)];
		}
	});
});
// gets the html day from the json
const getDayJson = fetch('./json/weathertemp.json').then((response) => {
	response.json().then((result) => {
		if (date.getDay() == 1) {
			todayDate[0].classList.add('monday');
		} else {
			todayDate[0].classList.remove('monday');
		}
		todayDate[0].innerHTML = result[date.getDay()];
	});
});
let date = new Date();

async function getForcast() {
	const response = await fetch(url);
	const data = await response.json();

	return data;
}
async function getWW() {
	const ww = await fetch('./json/ww.json');
	const result = await ww.json();
	return result;
}
let errorHandler = (error) => {
	console.warn(error);
	return {
		time: 'error',
		temp: 'error',
		hum: 'error',
		code: 'error',
		result: () => {
			return 'error';
		},
	};
};
async function todaysForcast(num) {
	try {
		const results = await getForcast();
		return {
			time: results.hourly.time[num],
			temp: results.hourly.temperature_2m[num],
			hum: results.hourly.relativehumidity_2m[num],
			code: results.hourly.weathercode[num],
			result: async () => {
				const ww = await getWW();
				return ww[results.hourly.weathercode[num]];
			},
		};
	} catch (error) {
		errorHandler(error);
	}
}

//gets the current weather in api
async function currentWeather() {
	const response = await getForcast();

	return {
		temp: response.current_weather.temperature,
		time: response.current_weather.time,
		weathercode: response.current_weather.weathercode,
		result: async () => {
			const ww = await getWW();
			return ww[response.current_weather.weathercode];
		},
	};
}
//demonstration
currentWeather().then((results) => {
	console.log('The current weather is:');
	console.log(results.weathercode);
	morganaSpeaks(results.weathercode);
	results.result().then((joe) => {
		console.log(joe);
	});
});

//gets the curr temp
function getCurrTemp(index) {
	currentWeather().then((response) => {
		curTemp[index].children[0].textContent = response.temp + '\u00B0';
		curTemp[index].children[1].textContent = response.temp + '\u00B0';
	});
}

//tells what class to add to the img also adds what morgana is going to say about the weather
function showForecast(input, index) {
	if (input == 3 || input == 0) {
		weatherForecast[index].classList.add('sunny');
	} else if (input >= 1 && input <= 45 && input != 3) {
		weatherForecast[index].classList.add('cloudy');
	} else if (input >= 51 && input <= 65) {
		weatherForecast[index].classList.add('rainy');
	} else if (input >= 66 && input <= 77) {
		weatherForecast[index].classList.add('snowy');
	} else if (input >= 80 && input <= 86) {
		weatherForecast[index].classList.add('rainy');
	} else if (input >= 95 && input < 99) {
		weatherForecast[index].classList.add('cloudy');
	} else {
		console.warn('forcast: somethign went wrong');
		console.log(input);
	}
}

function morganaSpeaks(input) {
	if (input == 3 || input == 0) {
		speak = morgana_speak.sunny;
	} else if (input >= 1 && input <= 45 && input != 3) {
		speak = morgana_speak.cloudy;
	} else if (input >= 51 && input <= 65) {
		speak = morgana_speak.rainy;
	} else if (input >= 80 && input <= 86) {
		speak = morgana_speak.rainy;
	} else if (input >= 95 && input < 99) {
		speak = morgana_speak.cloudy;
	} else {
		speak = 'le weather';
	}
}

//gets the forecast
function getCurrForecast(index) {
	currentWeather().then((response) => {
		showForecast(response.weathercode, index);
	});
}
// this gets the month
function getCurrentMonth() {
	curMon.children[0].textContent = date.getMonth() + 1;
	curMon.children[1].textContent = date.getMonth() + 1;
	curMon.children[2].textContent = date.getMonth() + 1;
	if (date.getMonth() + 1 > 10) {
		curMon.children[3].classList.add('month__black');
		curMon.children[4].classList.add('month__white');
	} else {
		curMon.children[3].classList.remove('month__black');
		curMon.children[4].classList.remove('month__white');
	}
}

// gets the days
function getCurrentDayNum(index) {
	let day = date.getDate() + index;
	day > 31 ? (day = day - 31) : (day = day);
	if (day < 10) {
		weekdayNum[index].children[0].textContent = '0' + day;
		weekdayNum[index].children[1].textContent = '0' + day;
		weekdayNum[index].children[2].textContent = '0' + day;
	} else {
		weekdayNum[index].children[0].textContent = day;
		weekdayNum[index].children[1].textContent = day;
		weekdayNum[index].children[2].textContent = day;
	}
}

// gets the min and max temp
function getMinMaxTemp(index) {
	getForcast().then((response) => {
		maxTemp[index].textContent = response.daily.temperature_2m_max[index] + 'º';
		minTemp[index].textContent = response.daily.temperature_2m_min[index] + 'º';
	});
}
// initializes time
function getCurrentDate() {
	getCurrentMonth();
	getCurrentDayNum(0);
}
function output(index) {
	let input = date.getDay() + index;
	let output;
	output = input >= 7 ? (output = input - 7) : (output = input);

	return output;
}

getCurrTemp(0);
getCurrentDate();
getCurrForecast(0);
getMinMaxTemp(0);
// if it output gets pass 8 then it subtracts it

//gets the date of the next 3 days
for (let index = 1; index < 4; index++) {
	getCurrentDayNum(index);
}

// gets the forcast
getForcast().then((response) => {
	for (let index = 1; index < 4; index++) {
		showForecast(response.daily.weathercode[index], index);
		getMinMaxTemp(index);
	}
	setTimeout(() => {
		loadingScreen.classList.add('disappear');
		document.querySelector('.following--days').style.display = 'flex';
		setTimeout(() => {
			loadingScreen.classList.add('delete');
		}, 1000);
	}, 2000);
});
