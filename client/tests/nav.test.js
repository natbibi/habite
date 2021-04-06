let rHelpers;
describe('top navbar', () => {
    let nav;

    beforeAll(() => {
        document.documentElement.innerHTML = '<nav class="nav-bar"></nav>'
        nav = document.querySelector('nav');
        rHelpers = require('../js/renderHelpers');
    });

    beforeEach(() => {
        nav.innerHTML = '';
        rHelpers.renderNavBar();
    });

    describe('visibility', () => {
        it('should be displayed when rendered', () => {
            expect(nav).toBeTruthy();
            expect(nav.style.visibility).toBe('show');      
        });
    });

    describe('content', () => {
        it('generates at least one anchor tag', () => {
            expect(nav.querySelector('a')).toBeTruthy();
        });

        it('should have a background colour', () => {
            // Code here   
        });
    });

});