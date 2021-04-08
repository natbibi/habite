describe('habit endpoints', () => {
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

    describe("habit routes", () => {
        it("should return a list of all habits", async () => {
          const res = await request(api)
            .get("/habits")
          expect(res.statusCode).toEqual(200);
          expect(res.body).toEqual([ {id: 1, name: 'habit1'}, {id: 2, name: 'habit2'}, {id: 3, name: 'habit3'} ]);
        });
        it("should create a new habit", async () => {
            const res = await request(api)
              .post("/habits")
              .send({ name: 'habit4' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({id: 4, name: "habit4"});
          });
    })

    describe("user habit routes", () => {
        it("should return a list of a users habits", async () => {
          const res = await request(api)
            .get("/users/user1/habits")
          expect(res.statusCode).toEqual(200);
          expect(res.body).toEqual([{created_at: "04-08-2021", frequency: 5, habit_id: 1, habit_name: "habit1", id: 1, user_id: 1,username: "user1"}, {created_at: "04-08-2021", frequency: 8, habit_id: 2, habit_name: "habit2", id: 2, user_id: 1, username: "user1"}]);
        });
        it("should create a new user habit", async () => {
            const res = await request(api)
              .post("/users/user1/habits")
              .send({habit_id: 3, frequency: 2});
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                created_at: new Date(new Date().toLocaleString('en-GB', {timeZone: 'Europe/London'})).toISOString(),
                frequency: 2,
                habit_id: 3,
                user_id:1,
                id: 5
            });
          });
          it("should delete a user habit", async () => {
            const res = await request(api)
              .delete("/users/user1/habits/1")
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual("deleted succesfully");       
            const res2 = await request(api)
            .delete("/users/user1/habits/1")
          expect(res2.statusCode).toEqual(200);
          expect(res2.body).toEqual("could not delete");        
          });
    })

    describe("user habit entries routes", () => {

        it("should return all user habit entries in nicely formatted json", async () => {
            const res = await request(api)
            .get("/users/user1/habits/entries")
          expect(res.statusCode).toEqual(200);
          expect(res.body).toEqual([{
            created_at: "04-08-2021",
            day_entries: [{
            date: "04-08-2021",
            total: 4
          }, {
            date: "04-07-2021",
            total: null
          }, {
            date: "04-06-2021",
            total: null
          }, {
            date: "04-05-2021",
            total: null
          }],
            max_frequency: 5,
            name: "habit1",
            streakData: {
              current_streak: 4,
              top_streak: 4
            },
            user_habit_id: 1
          }, {
            created_at: "04-08-2021",
            day_entries: [{
            date: "04-08-2021",
            total: 2
          }, {
            date: "04-07-2021",
            total: null
          }, {
            date: "04-06-2021",
            total: null
          }, {
            date: "04-05-2021",
            total: null
          }],
            max_frequency: 8,
            name: "habit2",
            streakData: {
              current_streak: 2,
              top_streak: 2
            },
            user_habit_id: 2
          }])
        })
    })

    it("should create a new habit entry", async () => {
        const res = await request(api)
        .post("/users/user1/habits/entries")
        .send({user_habit_id: 1, completed: true})
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
          completed: true,
          id: 9,
          completed_at: new Date(new Date().toLocaleString('en-GB', {timeZone: 'Europe/London'})).toISOString(),
          user_habit_id: 1
      })
    })

    it("should delete a habit entry", async () => {
        const res = await request(api)
        .delete("/users/user1/habits/entries/1")
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual("deleted succesfully")
      })

})