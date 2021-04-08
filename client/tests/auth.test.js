global.fetch = require('jest-fetch-mock');
global.hostURL = "testHost";
let auth = require('../js/auth');
const jwt_decode = require('jwt-decode');
jest.mock('jwt-decode', () => () => ({}))

describe('auth', () => {
    describe('requests', () => {
        let e;
        beforeEach(() => {
            fetch.resetMocks();
            e = { preventDefault: jest.fn() }
        });

        describe('requestRegistration', () => {
            it('should make a POST request to /auth/register with register form data', async () => {
                const form = document.createElement('form');
                form.innerHTML = `
                    <input id="username" name="username" value="test">
                    <input id="password" type="password" name="password" value="test">
                    <input id="password-check" type="password" name="password" value="test">`

                e.target = form;

                fetch.mockResponseOnce(JSON.stringify({test: "data"}))
                await auth.requestRegistration(e)
                
                expect(fetch.mock.calls[0][0]).toMatch(/auth\/register/)
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify(
                    { username: "test", password: "test" }));
            });
        });

        describe('requestLogin', () => {
            it('should make a POST request to /auth/login with login form data', async () => {
                const form = document.createElement('form');
                form.innerHTML = `
                    <input id="username" name="username" value="test">
                    <input id="password" type="password" name="password" value="test">`

                e.target = form;

                fetch.mockResponseOnce(JSON.stringify({ token: "test", success: true }))
                await auth.requestLogin(e)


                expect(fetch.mock.calls[0][0]).toMatch(/auth\/login/)
                expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
                expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify(
                    { username: "test", password: "test" }));

            });
        });
    });

    describe('page location', () => {
        describe('login', () => {
            it('should go to #profile', () => {
                auth.login();
                expect(window.location.hash).toEqual("#profile");
            });
        });

        describe('logout', () => {
            it('should go to #login', () => {
                auth.logout();
                expect(window.location.hash).toEqual("#login");
            });
        });
    });

    describe('username', () => {
        it('should get the current user in localstorage', () => {
            localStorage.setItem('username', "test");
            expect(auth.currentUser()).toEqual("test");

        });
    });
});