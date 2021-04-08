const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


let addPage;


// const auth = require('../js/auth');

jest.mock('../js/requests');
const req = require('../js/requests');
// const forms = require('../js/forms');
// jest.mock('../js/forms');
// jest.mock('../js/auth');

describe('addHabits', () => {
    let header;
    let main;

    beforeAll(() => {
        document.documentElement.innerHTML = html.toString();
        // `
        // <header id="top"></header>
        // <main class="container"></main>
        // <footer></footer>`;
        
        heading = document.querySelector('header');
        main = document.querySelector('main');
        addPage = require('../js/addHabits');
    });

    beforeEach(() => {
        heading.innerHTML = '';
        main.innerHTML = '';
        // addHabits.renderAddHabitsPage();
        // addHabits.createNewHabitForm();
    });

    describe('createAddHabitForm', () => {
        let form;
        beforeAll(() => {
            form = addPage.createAddHabitForm();
        });

        it('should return a form', () => {
            expect(form).toBeInstanceOf(HTMLFormElement);
        });

        it('should make a post request on form submit with a habit id and a frequency', () => {
            req.postData = jest.fn();
            form.submit();
    
            expect(req.postData).toHaveBeenCalled();
        });

    });

    describe('createNewHabitForm', () => {
        let form;
        beforeAll(() => {
            form = addPage.createNewHabitForm();
        });

        it('should return a form', () => {
            const form = addPage.createNewHabitForm();
            expect(form).toBeInstanceOf(HTMLFormElement);
        });

        it('should make a post request on form submit', () => {
            req.postData = jest.fn();
            form.submit();
    
            expect(req.postData).toHaveBeenCalled();
        });

    });

    describe('createDeleteHabitForm', () => {
        let form;
        beforeAll(() => {
            form = addPage.createDeleteHabitForm();
        });

        it('should return a form', () => {
            const form = addPage.createDeleteHabitForm();
            expect(form).toBeInstanceOf(HTMLFormElement);
        });

        it('should make a delete request on form submit', () => {
            req.deleteData = jest.fn();
            form.submit();
    
            expect(req.deleteData).toHaveBeenCalled();
        });
    });


    describe('renderAddHabitsPage', () => {

        it('should add the add, create and delete habit forms to the main area', () => {
            addPage.renderAddHabitsPage()
            const forms = document.querySelectorAll("form");
            expect(forms).toHaveLength(3);
        });
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

});