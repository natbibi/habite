const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    describe('head', () => {
        test('it has a title', () => {
            const head = document.querySelector('head')
            expect(head).toBeTruthy();
            expect(head.textContent).toContain('Cohabit');
        });

        test('it is linked to a CSS stylesheet', () => {
            const head = document.querySelector('head')
            expect(head.innerHTML).toContain('link rel=\"stylesheet\"');
        })

        test('it has a favicon', () => {   
            const head = document.querySelector('head')
            expect(head.innerHTML).toContain('link rel=\"icon\"');
        })

        test('it is linked to a bundle.js', () => {
            const head = document.querySelector('head')
            expect(head.innerHTML).toContain('script defer src=\"bundle.js\"');
        })
        
    })

    describe('body', () => {
        test('header exists', () => {
            expect(document.querySelector('header')).toBeTruthy();
        });

        test('it has a logo', () => {
            let header = document.querySelector('header');
            expect(header.innerHTML).toContain('img src=');
        })

        test('it has user login button', () => {
            let loginBtn = document.querySelector('.login-btn');
            expect(loginBtn).toBeTruthy();
            expect(loginBtn).textContent.toContain('login-btn');
        })

        test('it has user register button', () => {
            let registerBtn = document.querySelector('.register-btn');
            expect(registerBtn).toBeTruthy();
            expect(registerBtn).textContent.toContain('register-btn');
        })

        test('it has a dark/light mode switch button', () => {
            let switchBtn = document.querySelector('.dark-mode-btn');
            expect(switchBtn).toBeTruthy();
            expect(switchBtn).textContent.toContain('dark')
        })

        test('it has a nav bar', () => {
            let navbar = document.querySelector('.nav-bar');
            expect(navbar).toBeTruthy()
        })

        test('it has a footer', () => {
            let footer = document.querySelector('footer');
            expect(footer).toBeTruthy()
        })
    })
});
