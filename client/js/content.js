// Landing Page flow

function renderLandingPage() {
    renderHeading();
    renderAuthBtns();
    renderLoginForm();
}

// *******************************************************************

//Registration flow
function renderRegistrationForm() {
}

function renderProfile() {

}

function render404() {
    const error = document.createElement('h2');
    error.textContent = "Oops, we can't find that page!  Try looking elsewhere ...";
    main.appendChild(error);
}