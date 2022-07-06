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
	'https://api.open-meteo.com/v1/forecast?latitude=12.8785&longitude=121.7741&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&past_days=2';
async function getForcast() {
	const response = await fetch(url);
	const data = await response.json();

	return data;
}
async function getWW() {
	const ww = await fetch('./ww.json');
	const result = await ww.json();
	return result;
}
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
		console.warn(error);
		return {
			time: '404 not found',
			temp: '404 not found',
			hum: '404 not found',
			code: '404 not found',
			result: () => {
				return '404 not found';
			},
		};
	}
}
currentDay.forEach((day) => {
	promises.push(todaysForcast(day));
});
Promise.all(promises).then((results) => {
	results.forEach(async (element) => {
		const lue = await element.result();
		console.log(lue);
		console.log(element);
	});
});
// for weekly forcast
function weeklyForcast() {
	getForcast().then((result) => {
		console.log(result.daily.temperature_2m_max[0]);
		console.log(result.daily.time[2]);
	});
}
