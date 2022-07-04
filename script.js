// fetch(
// 	'https://api.open-meteo.com/v1/forecast?latitude=12.8789&longitude=121.7741&hourly=temperature_2m&current_weather=true'
// ).then((res) => {
// 	res.json().then((data) => {
// 		console.log(data);
// 	});
// });
const cock =
	'https://api.open-meteo.com/v1/forecast?latitude=12.8789&longitude=121.7741&hourly=temperature_2m&current_weather=true';

async function lue() {
	const data = await (await fetch(cock).catch(errorHandler)).json();
	console.log(data);
}

function errorHandler(err) {
	console.warn(err);
	let resp = new Response(
		JSON.stringify({
			hello: 'joe',
		})
	);
	return resp;
}
lue();
