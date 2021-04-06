const streak = require("../../../helpers/streak");

const testData = [
  {
    name: "drink water",
    username: "duckfliesagain",
    completed: true,
    id: 1,
    timestamp: "2021-04-06T13:17:43.243Z",
  },
  {
    name: "drink water",
    username: "duckfliesagain",
    completed: true,
    id: 2,
    timestamp: "2021-04-06T13:17:43.243Z",
  },
  {
    name: "drink water",
    username: "duckfliesagain",
    completed: true,
    id: 3,
    timestamp: "2021-04-06T13:17:43.243Z",
  },
  {
    name: "drink water",
    username: "duckfliesagain",
    completed: false,
    id: 4,
    timestamp: "2021-04-06T13:17:43.243Z",
  },
  {
    name: "workout",
    username: "duckfliesagain",
    completed: true,
    id: 5,
    timestamp: "2021-04-06T13:17:43.243Z",
  },
  {
    name: "workout",
    username: "duckfliesagain",
    completed: true,
    id: 6,
    timestamp: "2021-04-06T13:17:43.243Z",
  },
  ,
  {
    name: "drink water",
    username: "duckfliesagain",
    completed: true,
    id: 7,
    timestamp: "2021-04-06T13:17:43.243Z",
  },
  {
    name: "drink water",
    username: "duckfliesagain",
    completed: true,
    id: 8,
    timestamp: "2021-04-06T13:17:43.243Z",
  },
  {
    name: "drink water",
    username: "duckfliesagain",
    completed: true,
    id: 9,
    timestamp: "2021-04-06T13:17:43.243Z",
  },
  {
    name: "drink water",
    username: "duckfliesagain",
    completed: true,
    id: 10,
    timestamp: "2021-04-06T13:17:43.243Z",
  },
];

describe("streak calculation", () => {
  it("should return correct current and top streak values", () => {
    const testStreak = streak(testData);
    expect(testStreak).toEqual({
      "drink water": {
        current_streak: 4,
        top_streak: 4,
      },
      workout: {
        current_streak: 2,
        top_streak: 2,
      },
    });
  });
});
