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
        { tag: 'label', attributes: { id: 'username-label', for: 'username' }, text: 'Username'},
        { tag: 'input', attributes: { id: 'username', name: 'username', placeholder: 'Enter your username', } },
        { tag: 'label', attributes: { id: 'password-label', for: 'password' } , text: 'Password' },
        { tag: 'input', attributes: { id: 'password', type: 'password', name: 'password', placeholder: 'Enter your password', } },
        { tag: 'label', attributes: { id: 'robot-label', for: 'robot-check' }, text: 'Not a robot, (bzzt, dzzt).' },
        { tag: 'input', attributes: { id: 'robot-check', type: 'checkbox', name: 'robot-check', } },       
        { tag: 'input', attributes: { id: 'login-sbmt', type: 'submit', name: 'login-sbmt', value: 'Login', } }
    ];

    const form = createForm(authFields)
    form.classList.add("login-form");
    form.addEventListener('submit', auth.requestLogin);
    main.appendChild(form);
}

function renderRegisterForm() {
    const authFields = [
        { tag: 'label', attributes: { id: 'username-label', for: 'username' }, text: 'Username' },
        { tag: 'input', attributes: { id: 'username', name: 'username', placeholder: 'Enter your username', } },
        { tag: 'label', attributes: { id: 'password-label', for: 'password'}, text: 'Password'  },
        { tag: 'input', attributes: { id: 'password', type: 'password', name: 'password', placeholder: 'Enter your password', } },
        { tag: 'input', attributes: { id: 'password-check', type: 'password', name: 'password', placeholder: 'Confirm password', } },
        { tag: 'label', attributes: { id: 'robot-label', for: 'robot-check' }, text: 'Not a robot, (bzzt, dzzt).' },
        { tag: 'input', attributes: { id: 'robot-check', type: 'checkbox', name: 'robot-check', } },
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
        field.textContent = f.text || "";
        // let fieldId = f.attributes.id;
        // switch (fieldId) {
        //     case 'username-label':
        //         field.textContent = "username"; break;
        //     case 'password-label':
        //         field.textContent = "password"; break;
        //     case 'robot-label':
        //         field.textContent = "I am not a robot!"; break;
        //     default:
        //         field.textContent = ''; break;
        // }
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