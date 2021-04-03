const nav = document.querySelector('nav');
const heading = document.querySelector('header');
const main = document.querySelector('main');

const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = ['#profile'];

window.addEventListener('hashchange', updateContent);

function updateMain(path) {
    nav.innerHTML = '';
    heading.innerHTML = '';
    main.innerHTML = '';
    if (path) {
        switch(path) {
            case '#login':
                renderLoginForm(); break;
            case '#register':
                renderRegistrationForm(); break;
            case '#profile':
                renderProfile(); break;
            case '#more':
                renderMenuMessage(); break;
            case '#top':
                break;
            default:
                render404(); break;
        } 
    } else {
        renderLandingPage();
    }
}

function updateContent() {
    const path = window.location.hash;
    if(privateRoutes.includes(path) && !currentUser()) {
        window.location.hash = '#'
    } else {
        updateMain(path);
    }
}

updateContent();