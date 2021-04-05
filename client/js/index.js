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