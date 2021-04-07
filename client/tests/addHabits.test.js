let addHabits;

describe('addHabits', () => {
    let header;
    let main;

    beforeAll(() => {
        document.documentElement.innerHTML = '<header id="top"></header><main class="container"></main>';
        header = document.querySelector('header');
        main = document.querySelector('main');
        addHabits = require('../js/addHabits');
    });

    beforeEach(() => {
        header.innerHTML = '';
        main.innerHTML = '';
        addHabits.createNewHabitForm();
    });

    describe('createNewHabitForm', () => {

        it('should have a text area', () => {
            let textArea = main.querySelector('input');
            expect(textArea).toBeTruthy();
            expect(textArea.type).toContain('text');     
        });

        it('should have a button', () => {
            let button = main.querySelector('input');
            expect(button).toBeTruthy();      
        });

    });

});