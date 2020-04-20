/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

const navbar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const header = document.querySelector('.page__header');


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

// Set sections as active
const setActive = target => {
    document.querySelector('.your-active-class').classList.remove('your-active-class');
    target.classList.add('your-active-class');
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
const navBuilder = () => {
    for (let section of sections) {
        let temp = `<li class="menu__link">${section.querySelector('h2').innerText}</li>`;
        navbar.innerHTML += temp;
    };
    navbar.classList.toggle('hidden');
};

// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', e => {
    for (const key in sections) {
        if (window.pageYOffset >= (sections[key].offsetTop - 400)) {
            setActive(sections[key]);
        }
    }
});

// Build menu 
navBuilder();

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Scroll to section on link click
navbar.addEventListener('click', e => {
    let targetSect = document.querySelector(`[data-nav="${e.target.innerText}"]`);
    window.scrollTo(0, targetSect.offsetTop);
    navbar.classList.add('hidden');
})

// show or hide the navigation
header.firstElementChild.addEventListener('click', () => {
    navbar.classList.toggle('hidden');
});