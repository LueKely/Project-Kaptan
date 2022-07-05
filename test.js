async function pro() {
	const jason = await fetch('./ww.json');
	const response = await jason.json();
	return response;
}
let b = pro().then((result) => {
	return result;
});

console.log(b);
