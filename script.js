// header menu
let navMenu = document.querySelector('.nav-menu__list');
let logo = document.querySelector('#logo');
let toggleMenu = document.querySelector('#toggle-menu');

navMenu.addEventListener("click", (event) => {
	let prevLink = document.querySelector('.nav-menu__list .nav-menu__link--active');
	let activeLink = event.target;

	prevLink.classList.remove('nav-menu__link--active');
	activeLink.classList.add('nav-menu__link--active');

	if (logo.classList.contains('is-open')) {
		toggleMenu.click();
	}
}, false);


toggleMenu.addEventListener('click', (event) => {
	event.preventDefault();

	let menu = document.querySelector('.nav-menu');

	menu.classList.toggle('is-open');
	logo.classList.toggle('is-open');
	document.querySelector('body').classList.toggle('is-open-menu');

})

// slider
let slider = document.querySelector('.slider');
let slides = [...document.querySelectorAll('.slider__slide')];
let arrowRight = document.querySelector('.slider__arrow--right');
let arrowLeft = document.querySelector('.slider__arrow--left');

arrowRight.addEventListener("click", (event) => {
	slider.classList.toggle('slider--bg_primary');
	if (slides[slides.length - 1].classList.contains('slider__slide--current')) {
		slides[slides.length - 1].classList.remove('slider__slide--current');
		slides[0].classList.add('slider__slide--current');
	} else if (slides[0].classList.contains('slider__slide--current')) {
		slides[0].classList.remove('slider__slide--current');
		slides[1].classList.add('slider__slide--current');
	}

}, false);

arrowLeft.addEventListener("click", (event) => {
	slider.classList.toggle('slider--bg_primary');
	if (slides[slides.length - 1].classList.contains('slider__slide--current')) {
		slides[slides.length - 1].classList.remove('slider__slide--current');
		slides[0].classList.add('slider__slide--current');
	} else if (slides[0].classList.contains('slider__slide--current')) {
		slides[0].classList.remove('slider__slide--current');
		slides[1].classList.add('slider__slide--current');
	}

}, false);


//telephone

let button = [...document.querySelectorAll('.telephone .telephone__button')];

button.forEach((btn) => {
	btn.addEventListener('click', event => {
		let telephoneScreen = btn.previousElementSibling;
		telephoneScreen.classList.toggle('telephone__screen--hidden');
	})
})



