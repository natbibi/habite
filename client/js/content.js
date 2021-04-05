const rHelpers = require('./renderHelpers');

const nav = document.querySelector('nav');
const heading = document.querySelector('header');
const main = document.querySelector('main');

// Landing Page flow

function renderLandingPage() {
    rHelpers.renderHeading();
    rHelpers.renderAuthBtns();
    rHelpers.renderLoginForm();
}

// *******************************************************************

//Registration flow
function renderRegistrationForm() {
}

function renderProfile() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';

    const profileTitle = document.querySelector('header#top')
    const greeting = document.createElement('h3');
    greeting.textContent = `Hi there, ${localStorage.getItem('username')}!`;
    profileTitle.appendChild(greeting);

}

function renderMenuMessage() {
    const menuMessage = document.createElement('p');
    menuMessage.textContent = "Click or tap on the burger bar for more options";
    main.appendChild(menuMessage);

}

function render404() {
    const error = document.createElement('h2');
    error.textContent = "Oops, we can't find that page!  Try looking elsewhere ...";
    main.appendChild(error);
}

module.exports = { renderProfile, renderLandingPage, render404 }