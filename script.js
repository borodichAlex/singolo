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
	let top = header.offsetTop + header.offsetHeight + 10;

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

let changeArrow = arrow => {
	[...document.querySelectorAll('.slider__arrow img')].forEach(item => {
		item.src = arrow;
	})
};

let addSlideActive = (prevSlide, curSlide, arrow) => {
	slides[prevSlide].classList.remove('slider__slide--current');
	let right = "telephone--animationRight";
	let left = "telephone--animationLeft";

	[...slides[curSlide].children].forEach(item => {
		item.classList.remove(right);
		item.classList.remove(left);
		item.classList.add(arrow);
	});

	if (slides[curSlide].classList.contains('slider__slide--bg_primary')) {
		changeArrow('./assets/images/slider/slider-icon-arrow-left-v2.svg')
	} else {
		changeArrow('./assets/images/slider/slider-icon-arrow-left.svg')
	}

	slides[curSlide].classList.add('slider__slide--current');
}


arrowRight.addEventListener("click", (event) => {
	let prevSlide = slides.findIndex(slide => slide.classList.contains('slider__slide--current'));
	let right = "telephone--animationRight";

	if (prevSlide >= slides.length - 1) {
		addSlideActive(prevSlide, 0, right);
	} else {
		addSlideActive(prevSlide, prevSlide + 1, right);
	}

}, false);

arrowLeft.addEventListener("click", (event) => {
	let prevSlide = slides.findIndex(slide => slide.classList.contains('slider__slide--current'))
	let left = "telephone--animationLeft";

	if (prevSlide <= 0) {
		addSlideActive(prevSlide, slides.length - 1, left)
	} else {
		addSlideActive(prevSlide, prevSlide - 1, left)
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


//portfolio img

let images = [...document.querySelectorAll('.projects__img')]
let gridImg = document.querySelector('.projects__grid');

gridImg.addEventListener('click', event => {
	event.preventDefault();

	if (event.target.classList.contains('projects__img')) {
		let activeImg = event.target;
		let prevImg = images.findIndex(img => img.classList.contains('projects__img--active'));
		activeImg.classList.toggle('projects__img--active');
		if (prevImg !== -1) {
			images[prevImg].classList.remove('projects__img--active');
		}
	}

})

//portfolio tabs
let itemsFilter = [...document.querySelectorAll('.filters__link')];
let filter = document.querySelector('.projects__filters');
let itemsPortfolio = [...document.querySelectorAll('.projects__elem')]

let filterElems = (link) => {
	let filter = link.dataset.filter;
	console.log(filter);

	itemsPortfolio.forEach(item => {
		if (item.dataset.filter !== filter && filter !== 'all') {
			item.style.display = 'none';
		} else {
			item.style.display = 'block'
		}
	})

}

filter.addEventListener('click', event => {
	event.preventDefault();

	let activeLink = event.target;
	let prevLink = document.querySelector('.filters__link--active');

	prevLink.classList.remove('filters__link--active');
	activeLink.classList.add('filters__link--active');

	filterElems(activeLink.parentElement)

})

