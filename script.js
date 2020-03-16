// header menu
let navMenu = document.querySelector('#nav-menu');

navMenu.addEventListener("click", (event) => {
	let prevLink = document.querySelector('#nav-menu .nav-menu__link--active');
	let activeLink = event.target;

	prevLink.classList.remove('nav-menu__link--active');
	activeLink.classList.add('nav-menu__link--active');
}, false);
