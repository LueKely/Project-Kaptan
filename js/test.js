const weekday = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];
let date = weekday[new Date().getDay()];

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

currentWeather();
listcurrentWeather();
