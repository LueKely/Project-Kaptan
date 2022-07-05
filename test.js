// const data = await (await fetch(url).catch(errorHandler)).json();

// function errorHandler(err) {
// 	console.warn(err);
// 	let resp = new Response(JSON.stringify('ERROR'));
// 	return resp;
// }
const weekday = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];
// const ww = {
// 	0: 'clear sky',
// 	1: 'Mainly clear',
// 	2: 'partly cloudy',
// 	3: 'overcast',
// 	45: 'fog',
// 	48: 'deposting rime fog',
// 	51: 'Drizzle: light',
// 	53: 'Drizzle: moderate',
// 	55: 'Drizzle: dense intensity',
// };

let date = new Date();
let currentDay = [56, 59, 62, 65, 68];
const url =
	'https://api.open-meteo.com/v1/forecast?latitude=12.8785&longitude=121.7741&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&past_days=2';

async function getForcast() {
	const response = await fetch(url);
	const data = await response.json();

	return data;
}

async function todaysForcast(num) {
	const results = await getForcast();
	return {
		time: results.hourly.time[num],
		temp: results.hourly.temperature_2m[num],
		hum: results.hourly.relativehumidity_2m[num],
		code: results.hourly.weathercode[num],
		result: getWW().then((response) => {
			return response[results.hourly.weathercode[num]];
		}),
	};

	// await getForcast().then((result) => {
	// 	console.log("today's forcast is:");
	// 	console.log(weekday[date.getDay()]);
	// 	console.log(result.hourly.time[num]);
	// 	console.log(result.hourly.temperature_2m[num]);
	// 	console.log(result.hourly.relativehumidity_2m[num]);
	// 	console.log('Weather is ' + result.hourly.weathercode[num]);

	// 	getWW().then((response) => {
	// 		console.log(response[result.hourly.weathercode[num]]);
	// 	});
	// });
}
async function getWW() {
	const ww = await fetch('./ww.json');
	const result = await ww.json();
	return result;
}

const promises = [
	todaysForcast(currentDay[0]),
	todaysForcast(currentDay[1]),
	todaysForcast(currentDay[2]),
	todaysForcast(currentDay[3]),
];
Promise.all(promises).then((results) => {
	results[0].result.then((resp) => {
		console.log(resp);
	});
	results[1].result.then((resp) => {
		console.log(resp);
	});
	results[2].result.then((resp) => {
		console.log(resp);
	});
	results[3].result.then((resp) => {
		console.log(resp);
	});
});

// for weekly forcast
function weeklyForcast() {
	getForcast().then((result) => {
		console.log(result.daily.temperature_2m_max[0]);
		console.log(result.daily.time[2]);
	});
}
