(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// Landing Page flow

function renderLandingPage() {
    renderNavBar();
    renderHeading();
    renderAuthBtns();
    renderLoginForm();
}

// *******************************************************************

//Registration flow
function renderRegistrationForm() {

}

function renderProfile() {
    const showFooter = document.querySelector('footer')
    showFooter.display = "block"
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
},{}],3:[function(require,module,exports){
// Import js files
    // Rendering
    const layout = require('./layout');
    const content = require('./content');
    const rHelpers = require('./renderHelpers');
    const navResponse = require('./navResponse');
    // Authentication
    const auth = require('./auth');
    const requests = require('./requests')

// Create initial bindings
function initBindings(e) {
    e.preventDefault();
    // Initial bindings
    
    //Initiate rendering process
    layout.updateContent();
}

initBindings(e);
},{"./auth":1,"./content":2,"./layout":4,"./navResponse":5,"./renderHelpers":6,"./requests":7}],4:[function(require,module,exports){
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
                renderLandingPage(); break;
            case '#register':
                renderLandingPage(); renderRegistrationForm(); break;
            case '#profile':
                renderProfile(); break;
            case '#more':
                renderLandingPage(); renderMenuMessage(); break;
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

module.exports = { updateContent };
},{}],5:[function(require,module,exports){
function navFunc() {
    let x = document.getElementById('bottom-nav-bar');
    if (x.className === "bottom-nav") {
        x.className += " responsive";
    } else {
        x.className = "bottom-nav";
    }
};
},{}],6:[function(require,module,exports){
function renderNavBar() {
    // Create anchor for registration icon
    const regLink = document.createElement('a');
    regLink.id = "register";
    regLink.href = "#register";
    // Create anchor for login icon
    const loginLink = document.createElement('a');
    loginLink.id = "login";
    loginLink.href = "#login";
    loginLink.className = "active";
    // Create register icon
    const regIcon = document.createElement('i');
    regIcon.className = "fas fa-user-plus";
    // Create login icon
    const loginIcon = document.createElement('i');
    loginIcon.className = "fas fa-sign-in-alt";
    // Append icons to anchor tags
    regLink.appendChild(regIcon);
    loginLink.appendChild(loginIcon);
    // Append anchor tags to nav
    nav.appendChild(regLink);
    nav.appendChild(loginLink);
}

function renderHeading() {
    const header = document.querySelector('header');

    const heading = document.createElement('div');
    heading.className = 'heading';

    const iconDiv = document.createElement('div');
    iconDiv.id = "title-icon";

    const icon  = document.createElement('i');
    icon.className = "fas fa-fist-raised";
    icon.id = "title-icon";
    iconDiv.appendChild(icon);

    const title = document.createElement('div');
    title.id = "title";

    const appName = document.createElement('h1');
    appName.id = "app-name";
    appName.textContent = "grabbit";

    const tagline = document.createElement('h5');
    tagline.id = "tagline";
    tagline.textContent = "habbit your way";

    title.appendChild(appName);
    title.appendChild(tagline);

    heading.appendChild(iconDiv);
    heading.appendChild(title);

    header.appendChild(heading);
}

function renderAuthBtns() {
    const authBtns = document.createElement('div');
    authBtns.className = 'auth-btns';
    
    const loginBtn = document.createElement('button');
    loginBtn.className = 'login-btn';
    loginBtn.textContent = 'login';

    const regBtn = document.createElement('button');
    regBtn.className = 'register-btn';
    regBtn.textContent = 'register';

    authBtns.appendChild(loginBtn);
    authBtns.appendChild(regBtn);
    main.appendChild(authBtns);
}

function renderLoginForm() {
    // Define form fields
    const authFields = [
        { 
            tag: 'label', 
            attributes: {
                id: 'username-label',
                for: 'username'
            }
        },
        { 
            tag: 'input', 
            attributes: {
                type: 'text',
                id: 'username',
                name: 'username',
                placeholder: 'Enter your username',
            }
        },
        { 
            tag: 'label', 
            attributes: {
                id: 'password-label',
                for: 'password'
            }
        },
        { 
            tag: 'input', 
            attributes: {
                type: 'text',
                id: 'password',
                name: 'password',
                placeholder: 'Enter your password',
            }
        },
        { 
            tag: 'input', 
            attributes: {
                type: 'checkbox',
                id: 'robot-check',
                name: 'robot-check',
            }
        },
        { 
            tag: 'label', 
            attributes: {
                id: 'robot-label',
                for: 'robot-check'
            }
        },
        { 
            tag: 'input', 
            attributes: {
                type: 'submit',
                id: 'login-sbmt',
                name: 'login-sbmt',
                value: 'Go to profile ...',
            }
        }
    ];
    // Create new form element with auth-form class name
    const form = document.createElement('form');
    form.className = 'auth-form';
    // Create form elements
    authFields.forEach(f => {
        // Create a new html tag based on authFields entry
        let field = document.createElement(f.tag);
        // Add text content to relevant tags
        let fieldId = f.attributes.id;
        switch (fieldId) {
            case 'username-label':
                field.textContent = "username"; break;
            case 'password-label':
                field.textContent = "password"; break;
            case 'robot-label':
                field.textContent = "I am not a robot!"; break;
            default:
                field.textContent = ''; break;
        }
        // Add relevant attributes to each html tag and append to form
        Object.entries(f.attributes).forEach( ([att, val]) => {
            field.setAttribute(att,val);
            form.appendChild(field);
        })
    })
    // form.addEventListener('submit', requestLogin); <== Uncomment this once we have auth
    main.appendChild(form);
}
},{}],7:[function(require,module,exports){
async function getAllHabits() {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch('https://habit-your-way.herokuapp.com/habits', options);
        const data = await response.json();
        if (data.err) {
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getAllUsers() {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch('https://habit-your-way.herokuapp.com/users', options);
        const data = await response.json();
        if (data.err) {
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

module.exports = { getAllHabits, getAllUsers }
},{}]},{},[3]);
