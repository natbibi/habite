(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const req  = require("./requests");
const forms = require("./forms");
const heading = document.querySelector('header');
const main = document.querySelector('main');

async function renderAddHabitsPage() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
    // add greeting
    const greeting = document.createElement('h1')
    greeting.textContent = "Let's get started..."
    heading.appendChild(greeting)

    const addHabitForm = document.createElement("div");
    addHabitForm.className = "form-container";
    // addHabitForm.appendChild(addHabitForm());
    
     // add habits to dropdown
     const habitsDropdown = document.createElement("select");
     const habits = await req.get('habits');
     
     habits.forEach(habit => {
         const option = document.createElement("option");
         option.textContent = habit.name;
         habitsDropdown.appendChild(option)
     });
     

     const dropdown =  document.createElement("div");
     const frequency = document.createElement("div");
     const addHabitBtn = document.createElement("button");
     // create form
     addHabitForm.innerHTML = `    
     <form action="" method="POST" class="add-habit-form">
         <div class="habits-dropdown"> 
             <label for="habits">Choose a habit to track</label>
             ${habitsDropdown.outerHTML}
         </div>
  
         <div class="frequency-input">
             <label for="frequency">How many times per day?</label>
             <input type="number" name="frequency">
         </div>
         <input type="button" value="Start Tracking">
     </form>
     `

     console.log(addHabitForm);
    main.appendChild(addHabitForm)
}

async function addHabitForm() {
   // add a new user habit from a list
     
     return addHabitForm;
}

async function createNewHabitForm() {
    // create a new habit and add it to habits list (POST) 

//     <div class="add-habit-input">
//     <label for="new-habit">Or add a custom one!</label>
//     <input type="text" name="new-habit" id="new-habit">
//     <button><i class="fas fa-plus-circle"></i></button>
// </div>
}

async function deleteHabitForm() {
    // delete a user habit so it is no longer tracked
}

module.exports = {renderAddHabitsPage};
},{"./forms":4,"./requests":8}],2:[function(require,module,exports){
const jwt_decode = require('jwt-decode')

const hostURL = "http://localhost:3000"; // Should this be an ENV variable?

async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`${hostURL}/auth/login`, options)
        const data = await r.json()
        if (!data.success) { throw new Error('Login not authorised'); }
        login(data.token);
    } catch (err) {
        console.warn(err);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`${hostURL}/auth/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(token){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    window.location.hash = '#profile';
}

function logout(){
    localStorage.clear();
    window.location.hash = '#login';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

module.exports = {
    requestLogin,
    requestRegistration,
    currentUser,
    login,
    logout
}
},{"jwt-decode":9}],3:[function(require,module,exports){
const rHelpers = require('./renderHelpers');
const forms = require('./forms');
const requests = require('./requests')

const nav = document.querySelector('nav');
const heading = document.querySelector('header');
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
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
    const greeting = document.createElement('h1')
    greeting.textContent = `Hi there, ${localStorage.getItem('username')}!`;
    heading.appendChild(greeting);

    // const getHabits = await getAllHabits();
    // if (getHabits.err) { return }
    // const renderHabit = habitData => {
    const streaks = document.createElement('div')
    streaks.className = "streaks-list"
    const streaksHeading = document.createElement('h2')
    streaksHeading.className = "streaks-heading"
    streaksHeading.textContent = "🔥 Streaks"
    const streaksBody = document.createElement('div')
    streaksBody.className = "streaks-body"
    // insert GET request for habit completed here

    main.appendChild(streaks)
    streaks.appendChild(streaksHeading)
    streaks.appendChild(streaksBody)
    // streaks.appendChild(getHabits)
}


async function renderMyHabits() {
    const response = await requests.getAllHabits();
    const habitsList = await response.data
    if (habitsList.err) { return }
    const habits = document.createElement('div')
    habits.className = "habits-list"
    const habitsHeading = document.createElement('h2')
    habitsHeading.className = "habits-heading"
    habitsHeading.textContent = "💙 My Habits"
    const habitsContainer = document.createElement('div')
    habitsContainer.className = "habits-container"
    main.append(habits)
    // insert GET request for user habits here

    habitsList.forEach(habit => {

        // function getHabitList
        let habitContainer = document.createElement('div')
        habitContainer.className = "habit-container"

        let habitName = document.createElement('p')
        habitName.textContent = habit.name

        let habitFrequency = document.createElement('progress')
        habitFrequency.setAttribute('max', `${habit.max_frequency}`)
        habitFrequency.setAttribute('value', `${habit.total_completed}`)

        let habitMinus = document.createElement('i')
        habitMinus.className = "fas fa-minus minus-btn"

        let habitIncreaseFrequency = document.createElement('i')
        habitIncreaseFrequency.className = "fas fa-plus increase-freq-btn"

        habitsContainer.appendChild(habitContainer)
        habitContainer.appendChild(habitName)
        habitContainer.appendChild(habitFrequency)
        habitContainer.appendChild(habitMinus)
        habitContainer.appendChild(habitIncreaseFrequency)

    })

    habits.appendChild(habitsHeading)
    habits.appendChild(habitsContainer)
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


module.exports = { renderStreaks, renderMyHabits, renderLandingPage, render404 }
},{"./forms":4,"./renderHelpers":7,"./requests":8}],4:[function(require,module,exports){
const auth = require("./auth");
const main = document.querySelector('main');

// function renderAuthBtns() {
//     const authBtns = document.createElement('div');
//     authBtns.className = 'auth-btns';

//     const loginBtn = document.createElement('button');
//     loginBtn.className = 'login-btn';
//     loginBtn.textContent = 'login';

//     const regBtn = document.createElement('button');
//     regBtn.className = 'register-btn';
//     regBtn.textContent = 'register';

//     authBtns.appendChild(loginBtn);
//     authBtns.appendChild(regBtn);
//     main.appendChild(authBtns);
// }

function renderLoginForm() {
    // Define form fields
    const authFields = [
        { tag: 'label', attributes: { id: 'username-label', for: 'username' } },
        { tag: 'input', attributes: { id: 'username', name: 'username', placeholder: 'Enter your username', } },
        { tag: 'label', attributes: { id: 'password-label', for: 'password' } },
        { tag: 'input', attributes: { id: 'password', type: 'password', name: 'password', placeholder: 'Enter your password', } },
        { tag: 'input', attributes: { id: 'robot-check', type: 'checkbox', name: 'robot-check', } },
        { tag: 'label', attributes: { id: 'robot-label', for: 'robot-check' } },
        { tag: 'input', attributes: { id: 'login-sbmt', type: 'submit', name: 'login-sbmt', value: 'Login', } }
    ];

    const form = createForm(authFields)
    form.classList.add("login-form");
    form.addEventListener('submit', auth.requestLogin);
    main.appendChild(form);
}

function renderRegisterForm() {
    const authFields = [
        { tag: 'label', attributes: { id: 'username-label', for: 'username' } },
        { tag: 'input', attributes: { id: 'username', name: 'username', placeholder: 'Enter your username', } },
        { tag: 'label', attributes: { id: 'password-label', for: 'password' } },
        { tag: 'input', attributes: { id: 'password', type: 'password', name: 'password', placeholder: 'Enter your password', } },
        { tag: 'input', attributes: { id: 'password-check', type: 'password', name: 'password', placeholder: 'Confirm password', } },
        { tag: 'input', attributes: { id: 'robot-check', type: 'checkbox', name: 'robot-check', } },
        { tag: 'label', attributes: { id: 'robot-label', for: 'robot-check' } },
        { tag: 'input', attributes: { id: 'register-sbmt', type: 'submit', name: 'register-sbmt', value: 'Register', } }
    ];
    const form = createForm(authFields)
    form.classList.add("register-form");
    form.addEventListener('submit', auth.requestRegistration);
    main.appendChild(form);
}


function createForm(authFields) {
    // Create new form element with auth-form class name
    const form = document.createElement('form');
    form.method = "post";
    form.className = 'auth-form';
    // Create form elements
    authFields.forEach(f => {
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
        Object.entries(f.attributes).forEach(([att, val]) => {
            field.setAttribute(att, val);
        })
        form.appendChild(field);
    })
    return form;
}


function renderRegisterLink() {
    const registerPageBtn = document.createElement('button');
    const registerText = document.createElement('p');
    const registerElement = document.createElement('div');

    registerPageBtn.textContent = "Register";
    registerPageBtn.id = "register-link";
    
    registerText.textContent = "Don't have an account? Click here to create one!"

    registerElement.appendChild(registerText);
    registerElement.appendChild(registerPageBtn);

    main.appendChild(registerElement);
}

function renderLoginLink() {
    const loginPageBtn = document.createElement('button');
    const loginText = document.createElement('p');
    const loginElement = document.createElement('div');

    loginPageBtn.textContent = "Login";
    loginPageBtn.id = "login-link";
    
    loginText.textContent = "Already have an account? Click here to login!"

    loginElement.appendChild(loginText);
    loginElement.appendChild(loginPageBtn);

    main.appendChild(loginElement);
}

module.exports = {
    // renderAuthBtns,
    renderLoginForm,
    renderLoginLink,
    renderRegisterForm,
    renderRegisterLink,
    createForm
}
},{"./auth":2}],5:[function(require,module,exports){
// Import js files
// Rendering
const layout = require('./layout');
const content = require('./content');
// const navResponse = require('./navResponse');
// Authentication
const auth = require('./auth');
const requests = require('./requests')

// Create initial bindings
function initBindings() {
    // e.preventDefault();
    // Initial bindings
    console.log('You found our javaScript')
    layout.updateContent();
    window.addEventListener('hashchange', layout.updateContent);

    // Click event delegation
    const main = document.querySelector('main');
    const profile = document.getElementById('profile');
    const bottomNav = document.getElementById('bottom-nav-bar');

    main.addEventListener('click', formHandler);
    profile.addEventListener('click', navFunc);
    bottomNav.addEventListener('click', navHandler);
}

function formHandler(e) {
    const target = e.target.id;
    switch(target) {
        case 'register-link': window.location.hash = 'register'; break;
        case 'login-link': window.location.hash = 'login'; break;
        default: break;
    }
}

function navHandler(e) {
    const target = e.target.id;
    switch(target) {
        case 'logout': auth.logout(); break;
        case 'add-habit': window.location.hash = 'addhabits'; break;
        case 'show-habits': window.location.hash = 'profile'; break;
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


},{"./auth":2,"./content":3,"./layout":6,"./requests":8}],6:[function(require,module,exports){
const content = require('./content')
const addHabits = require('./addHabits');
const rHelpers = require('./renderHelpers');
const forms = require('./forms')
const auth = require('./auth');
const nav = document.querySelector('nav');
const heading = document.querySelector('header');
const main = document.querySelector('main');

const publicRoutes = ['#', '#login', '#register'];
const privateRoutes = []; // add #profile and #addhabits

// window.addEventListener('hashchange', updateContent);

function updateMain(path) {
    console.log("hello updating main")

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
                content.renderStreaks(); content.renderMyHabits(); break;
            case '#addhabits':
                addHabits.renderAddHabitsPage(); break;
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
    if (privateRoutes.includes(path) && !auth.currentUser()) {
        window.location.hash = ''
        // } else if (!privateRoutes.includes(path) && auth.currentUser()) {
        //     window.location.hash = 'profile';
    } else {
        updateMain(path);
    }
}

module.exports = { updateContent };
},{"./addHabits":1,"./auth":2,"./content":3,"./forms":4,"./renderHelpers":7}],7:[function(require,module,exports){
let nav;
let header;

// currently not in use!
function renderNavBar() {
    nav = document.querySelector('nav');

    nav.style.visibility = "show"
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
    header = document.querySelector('header');

    const heading = document.createElement('div');
    heading.className = 'heading';

    const iconDiv = document.createElement('div');
    iconDiv.id = "icon-div";

    const icon = document.createElement('i');
    icon.className = "fas fa-fist-raised";
    icon.id = "title-icon";
    iconDiv.appendChild(icon);

    const title = document.createElement('div');
    title.id = "title";

    const appName = document.createElement('h1');
    appName.id = "app-name";
    appName.textContent = "habite";

    const tagline = document.createElement('h5');
    tagline.id = "tagline";
    tagline.textContent = "habite your way";

    title.appendChild(appName);
    title.appendChild(tagline);

    heading.appendChild(iconDiv);
    heading.appendChild(title);

    header.appendChild(heading);
}


module.exports = {
    renderNavBar,
    renderHeading
}
},{}],8:[function(require,module,exports){
const auth = require('./auth')
const hostURL = "http://localhost:3000";
const username = auth.currentUser();

async function getAllHabits() {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch(`${hostURL}/users/${username}/habits/entries`, options)
        // https://habit-your-way.herokuapp.com/habits 
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

async function decrementHabit(id){
    try {
        const options = { 
            method: 'DELETE',
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }), 
        }
        await fetch(`${hostURL}/users/${username}/habits/entries/${id}`, options);
        window.location.hash = `#profile`
    } catch (err) {
        console.warn(err);
    }
}

async function deleteUserHabit(habit_id){
    try {
        const options = { 
            method: 'DELETE',
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }), 
        }
        await fetch(`${hostURL}/users/${username}/habits/${habit_id}`, options);
        window.location.hash = `#addhabit`
    } catch (err) {
        console.warn(err);
    }
}

async function get(path) {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch(`${hostURL}/${path}`, options)
        const data = await response.json();
        // if (data.err) {
        //     console.warn(data.err);
        //     logout();
        // }
        return data;
    } catch (err) {
        console.warn(err);
    }
}


async function post(path, data) {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${hostURL}/${path}`, options)
        const data = await response.json();
        // if (data.err) {
        //     console.warn(data.err);
        //     logout();
        // }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function get(path) {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch(`${hostURL}/${path}`, options)
        const data = await response.json();
        // if (data.err) {
        //     console.warn(data.err);
        //     logout();
        // }
        return data;
    } catch (err) {
        console.warn(err);
    }
}


async function post(path, data) {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${hostURL}/${path}`, options)
        const data = await response.json();
        // if (data.err) {
        //     console.warn(data.err);
        //     logout();
        // }
        return data;
    } catch (err) {
        console.warn(err);
    }
}



module.exports = { getAllHabits, getAllUsers, get}

},{"./auth":2}],9:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}]},{},[5]);
