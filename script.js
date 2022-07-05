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
const ww = {
	0: 'clear sky',
	1: 'Mainly clear',
	2: 'partly cloudy',
	3: 'overcast',
	45: 'fog',
	48: 'deposting rime fog',
	51: 'Drizzle: light',
	53: 'Drizzle: moderate',
	55: 'Drizzle: dense intensity',
};

let date = new Date();
const url =
	'https://api.open-meteo.com/v1/forecast?latitude=12.8785&longitude=121.7741&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&past_days=2';

async function getForcast() {
	const response = await fetch(url);
	const data = await response.json();

	return data;
}

function todaysForcast() {
	getForcast().then((result) => {
		console.log("today's forcast is:");
		console.log(weekday[date.getDay()]);

		let counter = 56;
		for (let index = 0; index < 5; index++) {
			console.log(result.hourly.time[counter]);
			console.log(result.hourly.temperature_2m[counter]);
			console.log(result.hourly.relativehumidity_2m[counter]);
			console.log('Weather is ' + result.hourly.weathercode[counter]);
			console.log(ww[result.hourly.weathercode[counter]]);
			// fetch('./ww.json')
			// 	.then((response) => response.json())
			// 	.then((res) => {
			// 		console.log(res[result.hourly.weathercode[counter]]);
			// 	});

			counter += 3;
		}
	});
}

function weeklyForcast() {
	getForcast().then((result) => {
		console.log(result.daily.temperature_2m_max[0]);
		console.log(result.daily.time[2]);
		console;
	});
}
todaysForcast();
async function pro() {
	const jason = await fetch('./ww.json');
	const response = await jason.json();
	return response;
}
let b = pro().then((result) => {
	return result['0'];
});

console.log(b);
