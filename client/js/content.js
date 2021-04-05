const rHelpers = require('./renderHelpers');

const nav = document.querySelector('nav');
const heading = document.querySelector('header');
const main = document.querySelector('main');

// Landing Page flow

function renderLandingPage() {
    // rHelpers.renderNavBar();
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

module.exports = { renderLandingPage, render404 }