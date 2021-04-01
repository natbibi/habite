const Author = require('../../../models/Author');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Author', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with authors on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Author.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('books', () => {
        test('it resolves with formatted books on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ 
                    rows: [{id: 1, title: 'book1'}, {id: 2, title: 'book2'}]
                });
            let testAuthor = new Author({ id: 1, name: 'Test Author'})
            const books = await testAuthor.books;
            expect(books).toHaveLength(2)
            expect(books[0]).toHaveProperty('path', '/books/1')
        })
    });

    describe('destroy', () => {
        test('it resolves with message on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ id: 1 });
            let testAuthor = new Author({ id: 1, name: 'Test Author'})
            const result = await testAuthor.destroy();
            expect(result).toBe('Author 1 was deleted')
        })
    });

    describe('findById', () => {
        test('it resolves with author on successful db query', async () => {
            let authorData = { id: 1, name: 'Test Author' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ authorData] });
            const result = await Author.findById(1);
            expect(result).toBeInstanceOf(Author)
        })
    });

    describe('create', () => {
        test('it resolves with author on successful db query', async () => {
            let authorData = { id: 1, name: 'New Author' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ authorData] });
            const result = await Author.create('New Author');
            expect(result).toBeInstanceOf(Author)
        })
    });

    describe('findOrCreateByName', () => {
        test('it calls on Author.create if name not found', async () => {
            let authorData = { id: 1, name: 'New Author' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ ] });
            const createSpy = jest.spyOn(Author, 'create')
                .mockResolvedValueOnce(new Author(authorData));
            const result = await Author.findOrCreateByName('New Author');
            expect(createSpy).toHaveBeenCalled();
            expect(result).toBeInstanceOf(Author);
        })

        test('it does not call on Author.create if name found', async () => {
            let authorData = { id: 1, name: 'Old Author' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ authorData ] });
            const createSpy = jest.spyOn(Author, 'create')
                .mockResolvedValueOnce(new Author(authorData));
            const result = await Author.findOrCreateByName('Old Author');
            expect(createSpy).not.toHaveBeenCalled();
            expect(result).toBeInstanceOf(Author);
        })
    });
    
})