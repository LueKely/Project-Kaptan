const choices = document.querySelectorAll('.choices--container');
const choiceBox = document.querySelectorAll('.click');

choiceBox.forEach((box) => {
	box.addEventListener('mouseover', (e) => {
		e.target.parentElement.classList.toggle('focused');
	});
	box.addEventListener('mouseout', (e) => {
		e.target.parentElement.classList.remove('focused');
	});
	box.addEventListener('click', (e) => {
		alert(e.target);
	});
});

// choiceBox.addEventListener('mouseover', () => {
// 	choices.classList.toggle('focused');
// });
