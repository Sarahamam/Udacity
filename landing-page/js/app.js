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
//defining a global variable called (sections) 
let navbarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isInViewport(elem) {
	var distance = elem.getBoundingClientRect();

	return (
		distance.top >= -300 &&
		distance.left >= 0 &&
		distance.bottom <= (1.3 * window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
window.addEventListener('load', buildNavbar())function addSections() {
    for (let item of sections) {
        let section = document.createElement('li');
        section.className = 'menu__link';
        section.dataset.nav = item.id;
        section.innerText = item.dataset.nav;
        navbar.appendChild(section);
    };
};

// Add class 'active' to section when near top of viewport
function activateCurrentSection(currentSection) {
    currentSection.classList.add("your-active-class", "active");

    deactivateNavLinks();
    activateNavLinks(currentSection.getAttribute('id'));
}

function activateNavLinks(currentSectionId) {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
    console.log(navbarAnchors);
        navbarAnchors.forEach((element)=>{
            if(element.getAttribute('href') == `#${currentSectionId}`) {
                element.classList.add("active-nav");
            }
        });
}

// Scroll to anchor ID using scrollTO event
function scrollToSectionOnClick() {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
    navbarAnchors.forEach((element) => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(element.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
addSections();

// Scroll to section on link click
scrollToClick();
// Set sections as active
setActive();

