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
    const greeting = document.createElement('h1');
    greeting.textContent = `Hi there, ${localStorage.getItem('username')}!`;
    profileTitle.appendChild(greeting);

    const mainContainer = document.querySelector('.container')
    const streaks = document.createElement('div')
    streaks.className = "streaks-list"
    const streaksHeading = document.createElement('h2')
    streaksHeading.className = "streaks-heading"
    streaksHeading.textContent = "🔥 Streaks"
    const streaksBody = document.createElement('div')
    streaksBody.className = "streaks-body"
    // insert GET request for habit completed here

    mainContainer.appendChild(streaks)
    streaks.appendChild(streaksHeading)
    streaks.appendChild(streaksBody)

    const habits = document.createElement('div')
    habits.className = "habits-list"
    const habitsHeading = document.createElement('h2')
    habitsHeading.className = "habits-heading"
    habitsHeading.textContent = "💙 My Habits"
    const habitsBody = document.createElement('div')
    habitsBody.className = "habits-body"
    // insert GET request for user habits here

    mainContainer.append(habits)
    habits.appendChild(habitsHeading)
    habits.appendChild(habitsBody)

}

function renderAddHabitsPage() {

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

module.exports = { renderProfile, renderAddHabitsPage, renderLandingPage, render404 }