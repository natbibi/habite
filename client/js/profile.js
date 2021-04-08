const rHelpers = require('./renderHelpers');
const forms = require('./forms');
const requests = require('./requests')
const auth = require('./auth')

const username = auth.currentUser();
const nav = document.querySelector('nav');
const heading = document.querySelector('header');
const main = document.querySelector('main');

async function streaksHelper() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
    const greeting = document.createElement('h1')
    greeting.textContent = `Hi there, ${localStorage.getItem('username')}!`;
    heading.appendChild(greeting);

    const userData = await requests.getData(`users/${username}/habits/entries`);
    if (requests.getData.err) { return }
    const streaks = document.createElement('div')
    streaks.className = "streaks-list"
    const streaksHeading = document.createElement('h2')
    streaksHeading.className = "streaks-heading"
    streaksHeading.textContent = "🔥 Streaks"
    streaks.appendChild(streaksHeading);

    const streaksContainer = document.createElement('div')
    streaksContainer.className = "streaks-container"
    main.appendChild(streaksContainer)

    // insert GET request for habit completed here
    userData.forEach(streaks => {
        let streakContainer = document.createElement('div');
        streakContainer.className = 'streak-container';

        let streakName = document.createElement('h5');
        streakName.textContent = streaks.name;
        streakContainer.appendChild(streakName);
        
        let currentStreakTotal = streaks.streakData.current_streak;

        let dayNumber = '';
        console.log(dayNumber);
        if(currentStreakTotal===1){
            dayNumber==='day'
        } else {
            dayNumber==='days'
        };
    
        let message;

        if(currentStreakTotal===0) {
            message = "Crumbs ... let's get back in the habite!";
        } else if (currentStreakTotal>0 && currentStreakTotal<=2) {
            message = "Great start!  Keep at it!";
        } else if (currentStreakTotal>2 && currentStreakTotal<=7) {
            message = `A habit a day keeps procrastination away!`;
        } else if (currentStreakTotal>7 && currentStreakTotal<=14) {
            message = "More than a week effort!";
        } else if (currentStreakTotal>14) {
            message = "Rehabite-ation not required here!";
        } else {
            message = "Whoops.  No streakers here!";
        }

        let currentStreakMessage = document.createElement('p');
        currentStreakMessage.textContent = `${currentStreakTotal} ${dayNumber}, ${message}`;
        streakContainer.appendChild(currentStreakMessage);

        let topStreak = streaks.streakData.top_streak;
        let topStreakMessage = document.createElement('p');
        topStreakMessage.textContent = `Your PB is ${topStreak}!`;
        streakContainer.appendChild(topStreakMessage);

        streaksContainer.appendChild(streakContainer);
    })
}

async function habitsHelper() {
    const habitsList = await requests.getData(`users/${username}/habits/entries`);
    if (habitsList.err) { return }
    const habits = document.createElement('div')
    habits.className = "habits-list"
    const habitsHeading = document.createElement('h2')
    habitsHeading.className = "habits-heading"
    habitsHeading.textContent = "💙 My Habits"
    const habitsContainer = document.createElement('div')
    habitsContainer.className = "habits-container"
    main.append(habits)

    // insert GET request for user habits here
    habitsList.forEach(habit => {

        // function getHabitList
        let habitContainer = document.createElement('div')
        habitContainer.className = "habit-container"

        let currentHabitTotal = habit.day_entries[0].total
        let currentHabitID = habit.user_habit_id

        let habitName = document.createElement('p')
        habitName.textContent = habit.name

        let habitFrequency = document.createElement('progress')
        habitFrequency.setAttribute('max', habit.max_frequency)
        habitFrequency.setAttribute('value', currentHabitTotal)

        function updateProgressBar() {
            habitFrequency.setAttribute('value', currentHabitTotal)
        }

        let habitMinus = document.createElement('button')
        habitMinus.innerHTML = `<i class="fas fa-minus minus-btn"></i>`

        let habitIncreaseFrequency = document.createElement('button')
        habitIncreaseFrequency.id = "increase-freq-btn"
        habitIncreaseFrequency.innerHTML = `<i class="fas fa-plus"></i>`

        let habitSeeMore = document.createElement('button')
        habitSeeMore.innerHTML = `<i class="fas fa-ellipsis-h see-more-btn"></i>`


        // POST: Increment habit 
        habitIncreaseFrequency.addEventListener('click', () => {
            currentHabitTotal += 1
            try {
                const data = { user_habit_id: currentHabitID, completed: true }
                requests.postData(`users/${username}/habits/entries`, data);
                updateProgressBar()
            } catch (err) {
                throw err
            }
        });

        // DELETE: Decrement habit
        habitMinus.addEventListener('click', () => {
            currentHabitTotal -= 1
            try {
                requests.deleteData(`users/${username}/habits/entries/${currentHabitID}`);
                updateProgressBar()
            } catch (err) {
                throw err
            }
        });

        let habitExtrasContainer = document.createElement('div')
        habitExtrasContainer.className = "habit-extras-container"

        habitSeeMore.addEventListener('click', () => {

            if (habitExtrasContainer.style.display === "grid") {
                habitExtrasContainer.style.display = "none";
            } else {
                habitExtrasContainer.style.display = "grid";
            }

            let habitExtrasDate = document.createElement('p')
            habitExtrasDate.className = "extras-date"
            habitExtrasDate.textContent = habit.day_entries[1].date

            let habitExtrasFrequency = document.createElement('progress')
            habitExtrasFrequency.className = "extras-progress"
            habitExtrasFrequency.setAttribute('max', `${habit.max_frequency}`)
            habitExtrasFrequency.setAttribute('value', `${habit.day_entries[1].total}`)

            // let habitExtrasDateTwo = document.createElement('p')
            // habitExtrasDateTwo.className = "extras-date-two"
            // habitExtrasDateTwo.textContent = habit.day_entries[2].date
            // console.log(habit.day_entries[2].date)

            // let habitExtrasFrequencyTwo = document.createElement('progress')
            // habitExtrasFrequencyTwo.className = "extras-progress-two"
            // habitExtrasFrequencyTwo.setAttribute('max', `${habit.max_frequency}`)
            // habitExtrasFrequencyTwo.setAttribute('value', `${habit.day_entries[2].total}`)

            habitContainer.appendChild(habitExtrasContainer)
            habitExtrasContainer.appendChild(habitExtrasDate)
            habitExtrasContainer.appendChild(habitExtrasFrequency)
            // habitExtrasContainer.appendChild(habitExtrasDateTwo)
            // habitExtrasContainer.appendChild(habitExtrasFrequencyTwo)
        })

        habitsContainer.appendChild(habitContainer)
        // habitContainer.appendChild(habitDate)
        habitContainer.appendChild(habitName)
        habitContainer.appendChild(habitFrequency)
        habitContainer.appendChild(habitMinus)
        habitContainer.appendChild(habitIncreaseFrequency)
        habitContainer.appendChild(habitSeeMore)
    })

    habits.appendChild(habitsHeading)
    habits.appendChild(habitsContainer)
}

module.exports = { streaksHelper, habitsHelper }