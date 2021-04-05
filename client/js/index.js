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


    //Initiate rendering process
    layout.updateContent();

    const settings = document.getElementById('settings')
    settings.addEventListener('click', navFunc())


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

