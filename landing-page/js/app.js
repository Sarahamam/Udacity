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
const navbar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section')

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// check which element is active
function getActiveElem() {
    maxSection = sections[0];
    minVal = 1000000;
    for (item of sections) {
        let bounding = item.getBoundingClientRect();
        if (bounding.top > -300 & bounding.top < minVal) {
            minVal = bounding.top;
            maxSection = item;
        };
    };
    return maxSection;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function navbarFilling() {
  for (let i = 0; i < sections.length; i++) {
    let navItem = document.createElement("LI");

    navList.append(navItem);

    newLink = document.createElement("A");

    navItem.append(newLink);

    // use data-nav attribute to fill li node
    newLink.innerHTML = sections[i].getAttribute("data-nav");

    newLink.classList.add("menu__link");
    newLink.style.cursor = "pointer";

    newLink.setAttribute("href", "#section" + (i + 1));

    //set a data-link attribute equals the section data-nav attr
    newLink.setAttribute("data-link", sections[i].getAttribute("data-nav"));
  }
}
// build the nav
navbarFilling();

// Add class 'active' to section when near top of viewport
function setActive () {
    window.addEventListener('scroll', function (event) {
        let section = getActiveElem();
        section.classList.add('your-active-class');
        // set other sections as inactive
        for (let item of sections) {
            if (item.id != section.id & item.classList.contains('your-active-class')) {
                item.classList.remove('your-active-class');
            }
        }
        // set corresponding header style
        const active = document.querySelector('li[data-nav="' + section.id + '"]');
        active.classList.add('active__link');
        // remove from other headers
        const headers = document.querySelectorAll('.menu__link');
        for (let item of headers) {
            console.log(item);
            if (item.dataset.nav != active.dataset.nav & item.classList.contains('active__link')) {
                item.classList.remove('active__link');
            }
        };
    });
};

// Scroll to anchor ID using scrollTO event
function scrollToClick() {
    navbar.addEventListener('click', function (event) {
        const clicked = document.querySelector('#' + event.target.dataset.nav)
        clicked.scrollIntoView();
    });
};


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function buildNavbar() {
	sections.forEach((element)=>{
	    let listItem = document.createElement("li");
	    listItem.classList.add("navbar__list__item");
    	let sectionName = element.getAttribute("data-nav");
    	let currentSectionId = element.getAttribute("id");
        listItem.innerHTML = `<a href="#${currentSectionId}" class="nav__hyperlink">${sectionName}</a>`;
        navbarList.appendChild(listItem);
    });
}

// Scroll to section on link click
scrollToClick();

// Set sections as active
setActive();
