const content = require('./content')
const addHabits = require('./addHabits');
const rHelpers = require('./renderHelpers');
const forms = require('./forms')
const auth = require('./auth');
const nav = document.querySelector('nav');
const heading = document.querySelector('header');
const main = document.querySelector('main');

const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = ['#profile', '#addhabits']; // add #profile and #addhabits


function updateMain(path) {
    // Clear page
    nav.innerHTML = '';
    main.innerHTML = '';
    heading.innerHTML = '';
    if (path) {
        switch (path) {
            case '#login':
                rHelpers.renderHeading()
                forms.renderLoginForm();
                forms.renderRegisterLink();
                break;
            case '#register':
                rHelpers.renderHeading()
                forms.renderRegisterForm();
                forms.renderLoginLink();
                break;
            case '#profile':
                rHelpers.renderHeading("small");
                content.renderProfile(); 
                break;

            case '#addhabits':
                rHelpers.renderHeading("small")
                addHabits.renderAddHabitsPage();
               
                break;
            case '#logout':
                rHelpers.renderHeading()
                auth.logout(); hideFooter(); break;
            default:
                content.render404(); break;
        }
    } else {
        content.renderLandingPage();
    }
}

function updateContent() {
    const path = window.location.hash;
    if (privateRoutes.includes(path) && !auth.currentUser()) {
        window.location.hash = ''
    } else if (!privateRoutes.includes(path) && auth.currentUser() && window.location.hash != '#logout') {
        window.location.hash = 'profile';
    } else {
        updateMain(path);
    }
}

function hideFooter() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'none';    
}

module.exports = { updateContent };