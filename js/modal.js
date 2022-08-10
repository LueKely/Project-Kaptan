const choices = document.querySelectorAll('.choices--container');
const choiceBox = document.querySelectorAll('.click');
const text = document.querySelector('.text');
const morgana = document.querySelector('.modal__morgana');
const funny = new Audio('../audio/funny.mp3');
const textBoxText = document.querySelector('.text__text');

choiceBox.forEach((box) => {
	box.addEventListener('mouseover', (e) => {
		e.target.parentElement.classList.toggle('focused');
	});
	box.addEventListener('mouseout', (e) => {
		e.target.parentElement.classList.remove('focused');
	});
});

choiceBox[0].addEventListener('click', () => {
	textBoxText.style.fontSize = '1.5rem';

	morganaClassChange('happy', 'mad', 'neutral');
	morgana.classList.add('neutral');
});

choiceBox[1].addEventListener('click', () => {
	textBoxText.style.fontSize = '1.5rem';
	text.textContent =
		'This is a litle project made by some loser who had 2 months to spare and has little to no social interaction. ';

	morganaClassChange('neutral', 'mad', 'happy');

	morgana.classList.add('happy');
});
choiceBox[2].addEventListener('click', () => {
	textBoxText.style.fontSize = '1rem';
	funny.volume = 0.75;
	funny.play();

	text.textContent =
		'krazy rapid boots idol hindi porket gosyon gamit mo hindi na pwede mag rapid boots para sabihin ko sayo sa mundo ng mobayl ligen lahat ng aytems ay pwede gamitin ng heroes naiintindihan moba idol mag aral ka muna nang mabuti tungkol sa ml o mobayl ligen.';

	morganaClassChange('happy', 'neutral', 'mad');

	morgana.classList.add('mad');
});

function morganaClassChange(a, b, c) {
	if (morgana.classList.contains(a) || morgana.classList.contains(b)) {
		morgana.classList.remove(a);
		morgana.classList.remove(b);
	} else {
		morgana.classList.add(c);
	}
}
