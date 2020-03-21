// header menu
let navMenu = document.querySelector('.nav-menu__list');
let logo = document.querySelector('#logo');
let toggleMenu = document.querySelector('#toggle-menu');

let itemsNavMenu = [...document.querySelectorAll('.nav-menu__link')];
let blocksNavMenu = itemsNavMenu.map(link => {
	let block = link.attributes.href.textContent;
	return document.querySelector(block);
})

let addLinkActive = (link) => {
	document.querySelector('.nav-menu__list .nav-menu__link--active').classList.remove('nav-menu__link--active');
	itemsNavMenu[link].classList.add('nav-menu__link--active');
}

document.onscroll = function showHeader() {
	let heightBlocks = blocksNavMenu.map(block => block.offsetTop)
	let header = document.querySelector('#header');
	let top = header.offsetTop + header.offsetHeight;

	(globalThis.pageYOffset > header.clientHeight) ? header.classList.add('header--fixed') : header.classList.remove('header--fixed');

	if (top < heightBlocks[1]) addLinkActive(0);
	if (top >= heightBlocks[1] && top < heightBlocks[2]) addLinkActive(1)
	if (top >= heightBlocks[2] && top < heightBlocks[3]) addLinkActive(2)
	if (top >= heightBlocks[3] && top < heightBlocks[4]) addLinkActive(3)
	if (top >= heightBlocks[4]) addLinkActive(4)
}

navMenu.addEventListener("click", (event) => {
	event.preventDefault();
	let prevLink = itemsNavMenu.findIndex(link => link.attributes.href.textContent === event.target.attributes.href.textContent);

	addLinkActive(prevLink)

	if (prevLink !== 0) {
		document.querySelector('html').scrollTop = blocksNavMenu[prevLink].offsetTop - blocksNavMenu[0].offsetHeight;
	} else {
		document.querySelector('html').scrollTop = 0;
	}

	if (logo.classList.contains('is-open')) toggleMenu.click();
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
let bodySlider = document.querySelector('.slider__body');

let addSlideActive = (prevSlide, curSlide) => {
	slides[prevSlide].classList.remove('slider__slide--current')
	slides[curSlide].classList.add('slider__slide--current');
}

arrowRight.addEventListener("click", (event) => {
	let prevSlide = slides.findIndex(slide => slide.classList.contains('slider__slide--current'))

	if (prevSlide >= slides.length - 1) {
		addSlideActive(prevSlide, 0);
	} else {
		addSlideActive(prevSlide, prevSlide + 1);
	}

}, false);

arrowLeft.addEventListener("click", (event) => {
	let prevSlide = slides.findIndex(slide => slide.classList.contains('slider__slide--current'))

	if (prevSlide <= 0) {
		addSlideActive(prevSlide, slides.length - 1)
	} else {
		addSlideActive(prevSlide, prevSlide - 1)
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


//modal
let submitForm = document.querySelector('.quote__form > input[type="submit"]');
let form = document.querySelector('.quote__form');
let modal = document.querySelector('#modal');
let buttonModal = document.querySelector('.modal__close');
let modalBackdrop = document.querySelector('.modal__backdrop');

submitForm.addEventListener('click', (event) => {
	event.preventDefault();

	let userName = document.querySelector('.quote__form > input[name="user-name"]');
	let email = document.querySelector('.quote__form > input[name="email"]');

	if (userName.checkValidity() && email.checkValidity()) {
		modal.style.display = 'block';
		document.querySelector('body').classList.toggle('is-open-menu');

		let subject = document.querySelector('.quote__form > input[name="subject"]');
		let describe = document.querySelector('.quote__form > textarea[name="describe-project"]');


		if (subject.value === '') {
			document.querySelector('.modal__subject').textContent = 'No subject';
		} else {
			document.querySelector('.modal__subject').textContent = `Subject: ${subject.value}`;
		}

		if (describe.value === '') {
			document.querySelector('.modal__description').textContent = 'No description';
		} else {
			document.querySelector('.modal__description').textContent = `Description: ${describe.value}`;
		}
	}

})

function closeModal() {
	modal.style.display = 'none';
	document.querySelector('body').classList.toggle('is-open-menu');

	form.reset()
}

buttonModal.addEventListener('click', (event) => {
	event.preventDefault();
	closeModal()
})

modalBackdrop.addEventListener('click', (event) => {
	event.preventDefault();
	closeModal()
})


