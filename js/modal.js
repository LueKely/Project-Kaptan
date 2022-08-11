const choices = document.querySelectorAll('.choices--container');
const choiceBox = document.querySelectorAll('.click');
const text = document.querySelector('.text');
const morgana = document.querySelector('.modal__morgana');
const funny = new Audio('../audio/funny.mp3');
const textBoxText = document.querySelector('.text__text');
const xbtn = document.querySelector('.screen');
const x = document.querySelector('.xbtn__black');
const x2 = document.querySelector('.xbtn__black1');
const modalBtn = document.querySelector('.modal-btn__img');
const modal = document.querySelector('.modal--container');

function showModal() {
	modalBtn.addEventListener('click', () => {
		modal.showModal();
	});
}
function closeModal() {
	xbtn.addEventListener('click', () => {
		modal.classList.add('animate__zoomOut');
		setTimeout(() => {
			modal.close();
			modal.classList.remove('animate__zoomOut');
		}, 250);
		text.textContent =
			'Thank you for visiting the Persona 5 themed Weather app, I hope you enjoyed using it as well as I did.';
		textBoxText.style.fontSize = '1.5rem';
		morganaClassChange('neutral', 'mad', 'happy');
		morgana.classList.add('happy');
	});
}

function hoverOnExit() {
	xbtn.addEventListener('mouseover', () => {
		x.classList.add('focused');
		x2.classList.add('focused');
	});

	xbtn.addEventListener('mouseout', () => {
		x.classList.remove('focused');
		x2.classList.remove('focused');
	});
}

function hoverOnChoices() {
	choiceBox.forEach((box) => {
		box.addEventListener('mouseover', (e) => {
			e.target.parentElement.classList.add('focused');
		});
		box.addEventListener('mouseout', (e) => {
			e.target.parentElement.classList.remove('focused');
		});
	});
}

function morganasDialogue() {
	text.textContent =
		'Thank you for visiting the Persona 5 themed Weather app, I hope you enjoyed using it as well as I did.';

	choiceBox[0].addEventListener('click', () => {
		textBoxText.style.fontSize = '1.5rem';
		text.textContent = speak;
		morganaClassChange('happy', 'mad', 'neutral');
		morgana.classList.add('neutral');
	});

	choiceBox[1].addEventListener('click', () => {
		textBoxText.style.fontSize = '1.5rem';
		text.innerHTML =
			'This is a litle project made by some loser who had a month to spare and has little to no social interactions.&nbsp;<a href="https://github.com/LueKely/Project-Kaptan" target="_blank"> Here\'s the repo link</a> ';

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
}

function morganaClassChange(a, b, c) {
	if (morgana.classList.contains(a) || morgana.classList.contains(b)) {
		morgana.classList.remove(a);
		morgana.classList.remove(b);
	} else {
		morgana.classList.add(c);
	}
}
showModal();
closeModal();
hoverOnExit();
hoverOnChoices();
morganasDialogue();
