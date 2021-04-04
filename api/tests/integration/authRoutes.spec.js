describe('auth endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('should login a user with correct credentials and return a token', async () => {
        const res = await request(api).post('/auth/login').send({username: 'user1', password: 'password'})
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not login a user with incorrect credentials', async () => {
        const res = await request(api).post('/auth/login').send({username: 'user1', password: 'fail'})
        expect(res.statusCode).toEqual(401);
    });

    it('should register a new user', async () => {
        const res = await request(api).post('/auth/register').send({username: 'user4', password: 'password'})
        expect(res.statusCode).toEqual(201)
        expect(res.body.msg).toEqual('User created');
    });

    it('should reject requests to login after three subsequent failed login attempts', async () => {
        for (let i=0; i<3; i++) {
            await request(api).post('/auth/login').send({username: 'user1', password: 'fail'})
        }
        const res = await request(api).post('/auth/login').send({username: 'user1', password: 'fail'})
        expect(res.statusCode).toEqual(429);
        expect(res.text).toBe('too many login attempts');
        const res2 = await request(api).post('/auth/login').send({username: 'user2', password: 'fail'})
        expect(res2.statusCode).toEqual(401);
    });

    it('should alow user to reset and attempt login again', async () => {
        for (let i=0; i<3; i++) {
            await request(api).post('/auth/login').send({username: 'user1', password: 'fail'})
        }
        await request(api).post('/reset').send({username: 'user1'})
        const res = await request(api).post('/auth/login').send({username: 'user1', password: 'password'})
        expect(res.statusCode).toEqual(200);
    });

    it('should lock users after 100 failed requests in general', async () => {
        for (let i=0; i<100; i++) {
            await request(api).get('/users/admin')
        }
        const res = await request(api).get('/users/admin')
        expect(res.statusCode).toEqual(429);
        expect(res.text).toBe('too many failed requests - try again later');
    });

})