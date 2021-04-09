const rHelpers = require('./renderHelpers');
const forms = require('./forms');
const requests = require('./requests')
const auth = require('./auth')
const profile = require('./profile');

const main = document.querySelector('main');
// const newDiv = document.createElement('div').cloneNode();

// Landing Page flow
function renderLandingPage() {
    rHelpers.renderHeading();
    // rHelpers.renderAuthBtns();
    forms.renderLoginForm();
    forms.renderRegisterLink();
}

// *******************************************************************

// render profile page, main page:
// aysnc  
function renderStreaks() {
    profile.streaksHelper();
}
function renderMyHabits() {
    profile.habitsHelper();
}
async function renderProfile() {
    await renderStreaks();
    await renderMyHabits();
}

// *******************************************************************


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