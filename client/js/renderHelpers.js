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