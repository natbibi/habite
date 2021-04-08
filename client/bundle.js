(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const req = require("./requests");
const forms = require("./forms");
const auth = require('./auth')
const heading = document.querySelector('header');
const main = document.querySelector('main');

function renderAddHabitsPage() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
    // add greeting
    const greeting = document.createElement('h1')
    greeting.textContent = "Let's get started..."
    heading.appendChild(greeting)

    // render add habit form
    const addHabitForm = document.createElement("div");
    addHabitForm.className = "form add-habit-form";
    const addHabitFormHeading = document.createElement("h2");
    addHabitFormHeading.textContent = "Track a habit";

    addHabitForm.appendChild(addHabitFormHeading);
    addHabitForm.appendChild(createAddHabitForm());

    // render create habit form
    const newHabitForm = document.createElement("div");
    newHabitForm.className = "form new-habit-form";
    const newHabitFormHeading = document.createElement("h2");
    newHabitFormHeading.textContent = "Create a new habit";

    newHabitForm.appendChild(newHabitFormHeading);
    newHabitForm.appendChild(createNewHabitForm());

    const deleteHabitForm = document.createElement("div");
    deleteHabitForm.className = "form delete-habit-form";
    const deleteHabitFormHeading = document.createElement("h2");
    deleteHabitFormHeading.textContent = "Stop tracking a habit";

    deleteHabitForm.appendChild(deleteHabitFormHeading);
    deleteHabitForm.appendChild(createDeleteHabitForm());

    main.appendChild(addHabitForm);
    main.appendChild(newHabitForm);
    main.appendChild(deleteHabitForm);
}

function createAddHabitForm() {
    // form fields
    fields = [
        { tag: 'label', attributes: { id: 'add-habits-dropdown', for: 'habits-dropdown' }, text: 'Choose a habit:' },
        { tag: 'select', attributes:{ id: 'add-habits-dropdown', name: 'habits-dropdown' } },
        { tag: 'label', attributes: { id: 'add-habits-frequency', for: 'frequency' }, text: 'How often?' },
        { tag: 'input', attributes: { id: 'add-habits-frequency', name: 'frequency', type: 'number', placeholder: '3', min: "1", max: "24", required: "true" } },
        { tag: 'p', attributes: {},  text: "times per day" },
        { tag: 'input', attributes: { id: 'add-habits-btn', type: 'submit', name: 'habit-sbmt', value: 'Track Habit' } }
    ];

    const form = forms.createForm(fields);
    const freqInput = form.querySelector("input[name='frequency']");
    const habitsDropdown = form.querySelector("select");

    // add habits to dropdown     
    req.getData('habits')
        .then(habits => {
            habits.forEach(habit => {
                const option = document.createElement("option");
                option.textContent = habit.name;
                option.setAttribute('data-id', habit.id);
                habitsDropdown.appendChild(option)
            })
        });

    form.onsubmit = (e) => {
        e.preventDefault();
        const selected = habitsDropdown.options[habitsDropdown.selectedIndex].getAttribute('data-id');
        const path = `users/${auth.currentUser()}/habits`
        const data = {
            habit_id: selected,
            frequency: freqInput.value
        }
        req.postData(path, data);
    };

    return form;
}

function createNewHabitForm() {
    fields = [
        { tag: 'label', attributes: { class: 'new-habit-name', for: 'new-habit-name' }, text: 'Add a custom habit' },
        { tag: 'input', attributes: { class: 'new-habit-name', name: 'new-habit-name', type: 'text', placeholder: 'use habite', required: "true" }, text: 'Add a custom habit' },
        { tag: 'input', attributes: { class: 'new-habit-btn', type: 'submit', name: 'new-habit-sbmt' } }
    ];

    const form = forms.createForm(fields);
    const nameInput = form.querySelector('input[type=text]');

    form.onsubmit = async (e) => {
        e.preventDefault();
        const data = { name: nameInput.value }
        req.postData(`habits`, data);
    };

    return form;
}

function createDeleteHabitForm() {
    fields = [
        { tag: 'label', attributes: { class: 'delete-habit', for: 'delete-habit-dropdown' }, text: 'Habit' },
        { tag: 'select', attributes: { class: 'delete-habit', name: 'delete-habit-dropdown' } },
        { tag: 'input', attributes: { class: 'new-habit-btn', type: 'submit', name: 'new-habit-sbmt' } }
    ];


    const form = forms.createForm(fields);
    const userHabitsDropdown = form.querySelector("select");

    req.getData(`users/${auth.currentUser()}/habits`)
        .then(habits => {
            habits.forEach(habit => {
                const option = document.createElement("option");
                option.textContent = habit.habit_name;
                option.setAttribute('data-id', habit.id);
                userHabitsDropdown.appendChild(option)
            })
        });


    form.onsubmit = async (e) => {
        e.preventDefault();
        const selected = userHabitsDropdown.options[userHabitsDropdown.selectedIndex].getAttribute('data-id');
        req.deleteData(`users/${auth.currentUser()}/habits/${selected}`);
    };

    return form;
}

module.exports = { renderAddHabitsPage };
},{"./auth":2,"./forms":4,"./requests":9}],2:[function(require,module,exports){
const jwt_decode = require('jwt-decode')

async function requestLogin(e){
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`${hostURL}/auth/login`, options)
        const data = await r.json()
        if (!data.success) { throw new Error(data.err); }
        login(data.token);
    } catch (err) {
        throw err;
    }
}

async function requestRegistration(e) {
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
        throw err;
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
},{"jwt-decode":10}],3:[function(require,module,exports){
const rHelpers = require('./renderHelpers');
const forms = require('./forms');
const requests = require('./requests')
const auth = require('./auth')
const profile = require('./profile');

const username = auth.currentUser();
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
    profile.streaksHelper();
}


function renderMyHabits() {
    profile.habitsHelper();
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


module.exports = { renderStreaks, renderMyHabits, renderLandingPage, render404 }
},{"./auth":2,"./forms":4,"./profile":7,"./renderHelpers":8,"./requests":9}],4:[function(require,module,exports){
const auth = require("./auth");
const main = document.querySelector('main');

function renderLoginForm() {
    // Define form fields
    const authFields = [
        { tag: 'label', attributes: { id: 'username-label', for: 'username' }, text: 'Username' },
        { tag: 'input', attributes: { id: 'username', name: 'username', placeholder: 'Enter your username', required: true } },
        { tag: 'label', attributes: { id: 'password-label', for: 'password' }, text: 'Password' },
        { tag: 'input', attributes: { id: 'password', type: 'password', name: 'password', placeholder: 'Enter your password', required: true } },
        { tag: 'label', attributes: { id: 'robot-label', for: 'robot-check' }, text: 'Not a robot, (bzzt, dzzt).' },
        { tag: 'input', attributes: { id: 'robot-check', type: 'checkbox', required: true } },
        { tag: 'input', attributes: { id: 'login-sbmt', type: 'submit', name: 'login-sbmt', value: 'Login', } }
    ];

    const form = createForm(authFields)
    form.className = "login-form auth-form";
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await auth.requestLogin(e);
        } catch (err) {

            const username = document.getElementById("username");
            const password = document.getElementById("password");
            username.classList.add("input-invalid");
            password.classList.add("input-invalid");

        }
    });


    main.appendChild(form);
}

function renderRegisterForm() {
    const authFields = [
        { tag: 'label', attributes: { id: 'username-label', for: 'username' }, text: 'Username' },
        { tag: 'input', attributes: { id: 'username', name: 'username', placeholder: 'Enter your username', required: true } },
        { tag: 'label', attributes: { id: 'password-label', for: 'password' }, text: 'Password' },
        { tag: 'input', attributes: { id: 'password', type: 'password', name: 'password', placeholder: 'Enter your password', required: true } },
        { tag: 'input', attributes: { id: 'password-check', type: 'password', name: 'password', placeholder: 'Confirm password', required: true } },
        { tag: 'label', attributes: { id: 'robot-label', for: 'robot-check', required: true }, text: 'Not a robot, (bzzt, dzzt).' },
        { tag: 'input', attributes: { id: 'robot-check', type: 'checkbox', required: true } },
        { tag: 'input', attributes: { id: 'register-sbmt', type: 'submit', name: 'register-sbmt', value: 'Register', } }
    ];
    const form = createForm(authFields)
    form.className = "register-form auth-form";

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const pass = document.getElementById("password");
        const confirm = document.getElementById("password-check");
        console.log(document.getElementById("password-check"));

        if (pass.value === confirm.value) {
            try {
                await auth.requestRegistration(e);
            } catch (err) {
                if (err.message.includes("duplicate")) {
                    const username = document.getElementById("username");
                    username.classList.add("input-invalid");
                    username.setAttribute('placeholder', `Sorry, ${username.value} is taken!`)
                    username.value = "";
                }
            }
        } else {
            confirm.classList.add("input-invalid");
        }
    });

    main.appendChild(form);
}


function createForm(authFields) {
    // Create new form element with auth-form class name
    const form = document.createElement('form');
    form.method = "post";
    form.className = 'submit-form';
    // Create form elements
    authFields.forEach(f => {
        let field = document.createElement(f.tag);
        // Add text content to relevant tags
        field.textContent = f.text || "";

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
(function (process,global){(function (){
// Import js files
// Rendering
const layout = require('./layout');
const content = require('./content');

global.hostURL = process.env.HOST_URL || "http://localhost:3000";

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


}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./content":3,"./layout":6,"_process":11}],6:[function(require,module,exports){
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
                addHabits.renderAddHabitsPage();
                break;
            case '#logout':
                auth.logout(); break;
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
},{"./addHabits":1,"./auth":2,"./content":3,"./forms":4,"./renderHelpers":8}],7:[function(require,module,exports){
const rHelpers = require('./renderHelpers');
const forms = require('./forms');
const requests = require('./requests')
const auth = require('./auth')

const username = auth.currentUser();
const nav = document.querySelector('nav');
const heading = document.querySelector('header');
const main = document.querySelector('main');

async function streaksHelper() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
    const greeting = document.createElement('h1')
    greeting.textContent = `Hi there, ${localStorage.getItem('username')}!`;
    heading.appendChild(greeting);

    const userData = await requests.getData(`users/${username}/habits/entries`);
    if (requests.getData.err) { return }
    const streaks = document.createElement('div')
    streaks.className = "streaks-list"
    const streaksHeading = document.createElement('h2')
    streaksHeading.className = "streaks-heading"
    streaksHeading.textContent = "🔥 Streaks"
    main.append(streaks)
    streaks.appendChild(streaksHeading);

    const streaksContainer = document.createElement('div')
    streaksContainer.className = "streaks-container"
    streaks.appendChild(streaksContainer)

    // insert GET request for habit completed here
    userData.forEach(streaks => {
        let streakContainer = document.createElement('div');
        streakContainer.className = 'streak-container';

        let streakName = document.createElement('h5');
        streakName.textContent = streaks.name;
        streakContainer.appendChild(streakName);
        
        let currentStreakTotal = streaks.streakData.current_streak;

        let dayNumber = '';
        console.log(dayNumber);
        if(currentStreakTotal===1){
            dayNumber='day'
        } else {
            dayNumber='days'
        };
    
        let message;

        if(currentStreakTotal===0) {
            message = "Crumbs ... let's get back in the habite!";
        } else if (currentStreakTotal>0 && currentStreakTotal<=2) {
            message = "Great start!  Keep at it!";
        } else if (currentStreakTotal>2 && currentStreakTotal<=7) {
            message = `A habit a day keeps procrastination away!`;
        } else if (currentStreakTotal>7 && currentStreakTotal<=14) {
            message = "More than a week effort!";
        } else if (currentStreakTotal>14) {
            message = "Rehabite-ation not required here!";
        } else {
            message = "Whoops.  No streakers here!";
        }

        let currentStreakMessage = document.createElement('p');
        currentStreakMessage.textContent = `${currentStreakTotal} ${dayNumber}, ${message}`;
        streakContainer.appendChild(currentStreakMessage);

        let topStreak = streaks.streakData.top_streak;
        let topStreakMessage = document.createElement('p');
        topStreakMessage.textContent = `Your PB is ${topStreak}!`;
        streakContainer.appendChild(topStreakMessage);

        streaksContainer.appendChild(streakContainer);
    })
}

async function habitsHelper() {
    const habitsList = await requests.getData(`users/${username}/habits/entries`);
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

        let currentHabitTotal = habit.day_entries[0].total
        let currentHabitID = habit.user_habit_id

        let habitName = document.createElement('p')
        habitName.textContent = habit.name

        let habitFrequency = document.createElement('progress')
        habitFrequency.setAttribute('max', habit.max_frequency)
        habitFrequency.setAttribute('value', currentHabitTotal)

        function updateProgressBar() {
            habitFrequency.setAttribute('value', currentHabitTotal)
        }

        let habitMinus = document.createElement('button')
        habitMinus.innerHTML = `<i class="fas fa-minus minus-btn"></i>`

        let habitIncreaseFrequency = document.createElement('button')
        habitIncreaseFrequency.id = "increase-freq-btn"
        habitIncreaseFrequency.innerHTML = `<i class="fas fa-plus"></i>`

        let habitSeeMore = document.createElement('button')
        habitSeeMore.innerHTML = `<i class="fas fa-ellipsis-h see-more-btn"></i>`


        // POST: Increment habit 
        habitIncreaseFrequency.addEventListener('click', () => {
            if (currentHabitTotal >= habit.max_frequency) {
            } else {currentHabitTotal++}
            try {
                const data = { user_habit_id: currentHabitID, completed: true }
                requests.postData(`users/${username}/habits/entries`, data);
                updateProgressBar()
            } catch (err) {
                throw err
            }
        });

        // DELETE: Decrement habit
        habitMinus.addEventListener('click', () => {
            if (currentHabitTotal === 0) {
            } else {currentHabitTotal--}
            try {
                requests.deleteData(`users/${username}/habits/entries/${currentHabitID}`);
                updateProgressBar()
            } catch (err) {
                throw err
            }
        });

        let habitExtrasContainer = document.createElement('div')
        habitExtrasContainer.className = "habit-extras-container"

        habitSeeMore.addEventListener('click', () => {

            if (habitExtrasContainer.style.display === "grid") {
                habitExtrasContainer.style.display = "none";
            } else {
                habitExtrasContainer.style.display = "grid";
            }

            let habitExtrasDate = document.createElement('p')
            habitExtrasDate.className = "extras-date"
            habitExtrasDate.textContent = habit.day_entries[1].date

            let habitExtrasFrequency = document.createElement('progress')
            habitExtrasFrequency.className = "extras-progress"
            habitExtrasFrequency.setAttribute('max', `${habit.max_frequency}`)
            habitExtrasFrequency.setAttribute('value', `${habit.day_entries[1].total}`)

            // let habitExtrasDateTwo = document.createElement('p')
            // habitExtrasDateTwo.className = "extras-date-two"
            // habitExtrasDateTwo.textContent = habit.day_entries[2].date
            // console.log(habit.day_entries[2].date)

            // let habitExtrasFrequencyTwo = document.createElement('progress')
            // habitExtrasFrequencyTwo.className = "extras-progress-two"
            // habitExtrasFrequencyTwo.setAttribute('max', `${habit.max_frequency}`)
            // habitExtrasFrequencyTwo.setAttribute('value', `${habit.day_entries[2].total}`)

            habitContainer.appendChild(habitExtrasContainer)
            habitExtrasContainer.appendChild(habitExtrasDate)
            habitExtrasContainer.appendChild(habitExtrasFrequency)
            // habitExtrasContainer.appendChild(habitExtrasDateTwo)
            // habitExtrasContainer.appendChild(habitExtrasFrequencyTwo)
        })

        habitsContainer.appendChild(habitContainer)
        // habitContainer.appendChild(habitDate)
        habitContainer.appendChild(habitName)
        habitContainer.appendChild(habitFrequency)
        habitContainer.appendChild(habitMinus)
        habitContainer.appendChild(habitIncreaseFrequency)
        habitContainer.appendChild(habitSeeMore)
    })

    habits.appendChild(habitsHeading)
    habits.appendChild(habitsContainer)
}

module.exports = { streaksHelper, habitsHelper }
},{"./auth":2,"./forms":4,"./renderHelpers":8,"./requests":9}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
async function getData(path) {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch(`${hostURL}/${path}`, options)
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


async function postData(path, formData) {
    try {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(formData)
        }
        const response = await fetch(`${hostURL}/${path}`, options);
        return response.json();
    } catch (err) {
        console.warn(err);
    }
}

async function deleteData(path) {
    try {
        const options = {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        await fetch(`${hostURL}/${path}`, options);
        return
    } catch (err) {
        console.warn(err);
    }
}

module.exports = { getData, postData, deleteData }

},{}],10:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}],11:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[5]);
