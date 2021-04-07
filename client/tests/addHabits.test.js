let addHabits;

describe('addHabits', () => {
    let header;
    let main;

    beforeAll(() => {
        document.documentElement.innerHTML = '<header id="top"></header><main class="container"></main>';
        heading = document.querySelector('header');
        main = document.querySelector('main');
        addHabits = require('../js/addHabits');
    });

    beforeEach(() => {
        heading.innerHTML = '';
        main.innerHTML = '';
        addHabits.renderAddHabitsPage();
        addHabits.createNewHabitForm();
    });

    describe('renderAddHabitsPage', () => {

        // it('heading should contain a greeting with a prompt to get started', () => {
        //     let greeting = heading.querySelector('h1');
        //     expect(greeting).toBeTruthy();
        //     expect(greeting.textContent).toContain('started');     
        // });

        // it('the page should contain a form', () => {
        //     let form = main.querySelector('form');
        //     expect(form).toBeTruthy();    
        // });

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