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