// Import js files
// Rendering
const layout = require('./layout');
const content = require('./content');

process.env.API || "http://localhost:3000";

// Create initial bindings
function initBindings() {
    // Initial bindings
    layout.updateContent();
    window.addEventListener('hashchange', layout.updateContent);

    // Click event delegation
    const main = document.querySelector('main');
    const profile = document.getElementById('profile');

    main.addEventListener('click', formHandler);
    profile.addEventListener('click', navFunc);
}

function formHandler(e) {
    const target = e.target.id;
    switch(target) {
        case 'register-link': window.location.hash = '#register'; break;
        case 'login-link': window.location.hash = '#login'; break;
        default: break;
    }
}

function navFunc() {
    let x = document.getElementById('bottom-nav-bar');
    if (x.className === "bottom-nav") {
        x.className += " responsive";
    } else {
        x.className = "bottom-nav";
    }
};

initBindings();

