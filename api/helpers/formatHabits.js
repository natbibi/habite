function zeroize(str){
    const arr = str.split("-")
        for (let i in arr) {
            if (arr[i].length === 1) {
              arr[i] = "0" + arr[i]
          }
        }

        return arr.join("-")
    }

function getDate(n) {
    const today = new Date()
    const newDay = new Date(today)
    newDay.setDate(newDay.getDate() - n)
    newDay.toDateString()
    return zeroize(newDay.toLocaleDateString('en-US').replace(/\//g, "-"))
  }

function formatData(listInfo, dataInfo, streakInfo) {

    const requiredData = [];
    const listArray = listInfo.map(item => {
      return {
        max_frequency: item.frequency,
        name: item.habit_name,
        user_habit_id: item.id,
        created_at: item.created_at,
        streakData: {
            current_streak: 0,
            top_streak: 0
          },
        day_entries: [{
            date: getDate(0),
            total: 0
          },
          {
            date: getDate(1),
            total: 0
          },
          {
            date: getDate(2),
            total: 0
          },
          {
            date: getDate(3),
            total: 0
          }
        ]
      }
    });
  
    listArray.forEach(habit => {
      requiredData.push(habit);
    })

  
  
    //Append streakInfo to relevant requiredData objects
    let streakArray = [];
  
    for (i in streakInfo) {
      streakArray.push({
        name: i,
        data: streakInfo[i]
      });
    }

    requiredData.forEach(item => {
      streakArray.forEach(streak => {
        if (streak.name === item.name) {
          item.streakData = streak.data
        }
      })

      dataInfo.forEach(entry => {
        item.day_entries.forEach(day => {
           (day.date, entry.date, item.user_habit_id === entry.user_habit_id)
          if (day.date === entry.date && item.user_habit_id === entry.user_habit_id) {
            day.total = entry.total_completed
          }
          if (new Date(day.date) < new Date(item.created_at)) {
            day.total = null
          }
        })
      })
    })
    return requiredData
  }

  module.exports = formatData
  