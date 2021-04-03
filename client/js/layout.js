const heading = document.getElementsByClassName('heading');
const main = document.querySelector('main');

const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = ['#profile'];

window.addEventListener('hashchange', updateContent);

function updateMain(path) {
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