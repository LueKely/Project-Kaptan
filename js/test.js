let currentDay = [56, 59, 62, 65, 68];
const promises = [];
const url =
	'https://api.open-meteo.com/v1/forecast?latitude=14.52&longitude=121.05&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FSingapore';
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

currentDay.forEach((day) => {
	promises.push(todaysForcast(day));
});

function listcurrentWeather() {
	Promise.all(promises).then((results) => {
		results.forEach(async (element) => {
			const lue = await element.result();
			console.log(lue);
			console.log(element);
		});
	});
}

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

currentWeather().then((results) => {
	console.log('The current weather is:');
	console.log(results);
	results.result().then((joe) => {
		console.log(joe);
	});
});
// listcurrentWeather();

const weekdayNum = document.querySelector('.weekday__item');
const curTemp = document.querySelector('.temptoday__item');
const curMon = document.querySelector('.month__item');
const todayDate = document.querySelector('.today__word');
const weatherForecast = document.querySelector('.character__sprite');
let date = new Date();

function getCurrTemp() {
	currentWeather().then((response) => {
		curTemp.children[0].textContent = response.temp + '\u00B0';
		curTemp.children[1].textContent = response.temp + '\u00B0';
	});
}

function getCurrForecast() {
	currentWeather().then((response) => {
		showForecast(response.weathercode);
	});
}

function showForecast(input) {
	if (input == 3 || input == 0) {
		weatherForecast.classList.add('sunny');
	} else if (input >= 1 && input < 45 && input != 3) {
		weatherForecast.classList.add('cloudy');
	} else if (input >= 51 && input <= 65) {
		weatherForecast.classList.add('rainy');
	} else if (input >= 66 && input <= 77) {
		weatherForecast.classList.add('snowy');
	} else if (input >= 80 && input <= 86) {
		weatherForecast.classList.add('rainy');
	} else if (input >= 95 && input < 99) {
		weatherForecast.classList.add('cloudy');
	} else {
		console.warn('forcast: somethign went wrong');
	}
}

function getCurrentMonth() {
	if (date.getMonth() + 1 > 10) {
		curMon.children[0].textContent = date.getMonth() + 1;
		curMon.children[1].textContent = date.getMonth() + 1;
		curMon.children[2].textContent = date.getMonth() + 1;
	} else {
		curMon.children[0].textContent = `0${date.getMonth() + 1}`;
		curMon.children[1].textContent = `0${date.getMonth() + 1}`;
		curMon.children[2].textContent = `0${date.getMonth() + 1}`;
	}
}
function getCurrentDayNum() {
	weekdayNum.children[2].textContent = date.getDate();
	weekdayNum.children[1].textContent = date.getDate();
	weekdayNum.children[0].textContent = date.getDate();
}

function getCurrentDate() {
	getCurrentMonth();
	getCurrentDayNum();
}
getCurrTemp();
getCurrentDate();
getCurrForecast();
const lue = fetch('./json/weathertemp.json').then((response) => {
	response.json().then((result) => {
		todayDate.innerHTML = result[date.getDay()];
	});
});
