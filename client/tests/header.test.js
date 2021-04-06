let rHelpers;
describe('header', () => {
    let header;

    beforeAll(() => {
        document.documentElement.innerHTML = <header id="top"></header>
        header = document.querySelector('header');
        rHelpers = require('../js/renderHelpers');
    });

    beforeEach(() => {
        header.innerHTML = '';
        rHelpers.renderHeading();
    });

    describe('content', () => {
        it('contains an icon', () => {
            let heading = header.getElementbyClassName('heading');
            let iconDiv = heading.getElementbyID('title-icon');
            expect(iconDiv.querySelector('i')).toBeTruthy();  

        });

        it('has a title containing the app name', () => {
            // Code here    
        });
    });

    describe('styling', () => {
        it('uses the Allerta font', () => {
            // Code here
        });

        it('should have a background colour', () => {
            // Code here   
        });
    });

});