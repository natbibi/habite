function streak(data) {
  let res = [];

  for (let habit in data) {
    res.push(data[habit].name);
  }

  let resSet = [...new Set(res)];
  const resObj = {};
  for (let uniqHabit in resSet) {
    resObj[resSet[uniqHabit]] = { current_streak: 0, top_streak: 0 };
  }

  for (let habit in data) {
    //   const jsDate = new Date(data[habit].timestamp);
    //   const date = [jsDate.getMonth() + 1, jsDate.getDate()];
      if (data[habit].completed) {
        resObj[data[habit].name].current_streak++;
        if (
          resObj[data[habit].name].top_streak <
          resObj[data[habit].name].current_streak
        ) {
          resObj[data[habit].name].top_streak =
            resObj[data[habit].name].current_streak;
        }
      } else {
        resObj[data[habit].name].top_streak =
          resObj[data[habit].name].current_streak;
        resObj[data[habit].name].current_streak = 0;
      }
  }
  return resObj;
}

module.exports = streak