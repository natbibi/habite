let rHelpers;
describe('header', () => {
    let header;

    beforeAll(() => {
        document.documentElement.innerHTML = '<header id="top"></header>';
        header = document.querySelector('header');
        rHelpers = require('../js/renderHelpers');
    });

    beforeEach(() => {
        header.innerHTML = '';
        rHelpers.renderHeading();
    });

    describe('content', () => {
        it('contains an icon', () => {
            // let heading = document.querySelector('.heading');
            // let iconDiv = document.querySelector('#icon-div');
            expect(document.querySelector('i')).toBeTruthy();  

        });

        it('has a title containing the app name', () => {
            // Code here 
            expect(document.querySelector('#app-name').textContent).toContain('habite');   
        });
    });

    // describe('styling', () => {
    //     it('uses the Allerta font', () => {
    //         // Code here
    //     });

    //     it('should have a background colour', () => {
    //         // Code here   
    //     });
    // });

});
