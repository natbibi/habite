let forms;
describe('form rendering', () => {
    let main;

    beforeAll(() => {
        document.documentElement.innerHTML = '<body><main></main></body>'
        main = document.querySelector('main');
        forms = require('../js/forms');
    });

    beforeEach(() => {
        main.innerHTML = '';
    });

    describe('renderLoginForm', () => {
        it('should add a login form into the main area', () => {
            forms.renderLoginForm();
            const form = main.querySelectorAll('form');
            expect(form).toHaveLength(1);
            expect(form[0].className).toMatch(/login/);
        });
    });

    
    describe('renderRegisterForm', () => {
        it('should add a register form into the main area', () => {
            forms.renderRegisterForm();
            const form = main.querySelectorAll('form');
            expect(form).toHaveLength(1);
            expect(form[0].className).toMatch(/register/);
        });
    });
    
    describe('createForm', () => {
        const mockFields = [{tag: 'input', attributes: { id: 'username'}}];
        it('should return a form', () => {
            const newForm = forms.createForm(mockFields)
            expect(newForm).toBeInstanceOf(HTMLFormElement);
        });

        it('should return a form with the given fields', () => {
            const newForm = forms.createForm(mockFields)
            expect(newForm.childNodes[0]).toBeInstanceOf(HTMLInputElement);
            expect(newForm.children[0].id).toBe('username');
        });
    });

    describe('renderLoginLink', () => {
        let loginDiv;
        beforeAll(() => {
            forms.renderLoginLink();
            loginDiv = main.querySelectorAll('div');
        });

        it('should create a new div', () => {
            expect(loginDiv).toHaveLength(1);
        });
        
        it('should add a login button into the new div', () => {
            loginDiv = loginDiv[0];
            const button = loginDiv.querySelector('button');
            expect(button).toBeTruthy();
            expect(button.textContent.toLowerCase()).toContain('login');
        });

        it('should add a helpful message into the new div', () => {
            const p = loginDiv.querySelector('p');
            expect(p).toBeTruthy();
        });
    });

    describe('renderRegisterLink', () => {
        let registerDiv;
        beforeAll(() => {
            forms.renderRegisterLink();
            registerDiv = main.querySelectorAll('div');
        });

        it('should create a new div', () => {
            expect(registerDiv).toHaveLength(1);
        });
        
        it('should add a register button into the new div', () => {
            registerDiv = registerDiv[0];
            const button = registerDiv.querySelector('button');
            expect(button).toBeTruthy();
            expect(button.textContent.toLowerCase()).toContain('register');
        });

        it('should add a helpful message into the new div', () => {
            const p = registerDiv.querySelector('p');
            expect(p).toBeTruthy();
        });
    });

    
    

});