global.fetch = require('jest-fetch-mock');
global.hostURL = "testhost:3000"
localStorage.setItem('token', 'testToken')

let requests = require('../js/requests');

describe('requests', () => {
    let mockPath;

    beforeAll(() => {
     
        mockPath = 'testhost:3000/test/';
    });

    beforeEach(() => {
        console.warn = jest.fn();
        fetch.resetMocks();
    })

    describe('getData', () => {


        it('should make a GET request to a given path', async () => {
            const mockData = {data: "test"};
            fetch.mockResponseOnce(JSON.stringify(mockData));
            const mockRes = await requests.getData(mockPath);

            expect(fetch.mock.calls[0][0]).toMatch(mockPath);
            expect(fetch.mock.calls[0][1]).toHaveProperty('headers');
            expect(mockRes).toEqual(mockData);
        });
        
        it('should throw an error if the response has one', async () => {
            const mockError = {err: "testError"};
            fetch.mockResponseOnce(JSON.stringify(mockError));
            await requests.getData(mockPath)
            expect(console.warn).toHaveBeenCalledWith("testError");
        });

        it('should catch an error and log it', async () => {
            const err = new Error("Test")
            fetch.mockRejectOnce(err);
            
            try {
                await requests.getData(mockPath);
            } catch (error) {
                expect(err).toEqual(err);
                expect(console.warn).toHaveBeenCalledWith(error);
            }
        });
    
   
       
    })

    describe('postData', () => {
        it('should make a POST request to a given path', async () => {

            const mockData = {data: "test"};
            fetch.mockResponseOnce(JSON.stringify({data: "test"}))
            await requests.postData(mockPath, mockData);

            expect(fetch.mock.calls[0][0]).toMatch(mockPath);
            expect(fetch.mock.calls[0][1]).toHaveProperty('headers');
            expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST');
            expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify(mockData));
        });

        it('should catch an error and log it', async () => {
            const err = new Error("Test")
            fetch.mockRejectOnce(err);
            
            try {
                await requests.postData(mockPath);
            } catch (error) {
                expect(err).toEqual(err);
                expect(console.warn).toHaveBeenCalledWith(error);
            }
        });

    });
    describe('deleteData', () => {
        it('should make a DELETE request to a given path', async () => {
            mockPath = 'testhost:3000/test/2';
            await requests.deleteData(mockPath);

            expect(fetch.mock.calls[0][0]).toMatch(mockPath);
            expect(fetch.mock.calls[0][1]).toHaveProperty('headers');
            expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'DELETE');
        });

        
        it('should catch an error and log it', async () => {
            const err = new Error("Test")
            fetch.mockRejectOnce(err);
            
            try {
                await requests.deleteData(mockPath);
            } catch (error) {
                expect(err).toEqual(err);
                expect(console.warn).toHaveBeenCalledWith(error);
            }
        });
    });
});