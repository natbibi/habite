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
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
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