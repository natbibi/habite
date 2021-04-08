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

    const icon = document.createElement('img');
    icon.src = '/images/habite-logo.png';
    // icon.id = "title-icon";
    iconDiv.appendChild(icon);

    const title = document.createElement('div');
    title.id = "title";

    // const appName = document.createElement('h1');
    // appName.id = "app-name";
    // appName.textContent = "habite";

    // const tagline = document.createElement('h5');
    // tagline.id = "tagline";
    // tagline.textContent = "habite your way";

    // title.appendChild(appName);
    // title.appendChild(tagline);

    heading.appendChild(iconDiv);
    // heading.appendChild(title);

    header.appendChild(heading);
}


module.exports = {
    renderNavBar,
    renderHeading
}