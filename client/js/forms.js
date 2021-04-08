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
    registerElement.className = "register-element"

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
    loginElement.className = "login-element"

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