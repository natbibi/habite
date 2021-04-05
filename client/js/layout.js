const content = require('./content')

const nav = document.querySelector('nav');
const heading = document.querySelector('header');
const main = document.querySelector('main');

const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = ['#profile'];



function updateMain(path) {
    console.log("hello updating main")

    nav.innerHTML = '';
    heading.innerHTML = '';
    main.innerHTML = '';
    if (path) {
        switch (path) {
            case '#login':
                content.renderLandingPage(); break;
            case '#register':
                content.renderLandingPage(); content.enderRegistrationForm(); break;
            case '#profile':
                content.renderProfile(); break;
            case '':
                content.renderLandingPage(); break;
            // case '#more':
            //     renderLandingPage(); renderMenuMessage(); break;
            // case '#top':
            //     break;
            default:
                content.render404(); break;
        }
    } else {
        content.renderLandingPage();
    }
}

function updateContent() {
    const path = window.location.hash;
    if (privateRoutes.includes(path) && !currentUser()) {
        window.location.hash = '#'
    } else {
        updateMain(path);
    }
}

// module.exports = { updateContent };