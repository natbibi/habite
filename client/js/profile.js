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
    greeting.textContent = `Hi there, ${localStorage.getItem('username')}! 👋🏼`;
    heading.appendChild(greeting);

    const userData = await requests.getData(`users/${username}/habits/entries`);
    if (requests.getData.err) { return }
    console.log(userData)
    const streaks = document.createElement('div')
    streaks.className = "streaks-list"
    const streaksHeading = document.createElement('h2')
    streaksHeading.className = "streaks-heading"
    streaksHeading.textContent = "🔥 Streaks"

    main.append(streaks)
    streaks.appendChild(streaksHeading);


    const streaksContainer = document.createElement('div')
    streaksContainer.className = "streaks-container"
    streaks.appendChild(streaksContainer)

    const streaksSeeMore = document.createElement('button')
    streaksSeeMore.innerHTML = `<i class="fas fa-chevron-down streaks-see-more-btn"></i>`
    streaksHeading.appendChild(streaksSeeMore)

    streaksSeeMore.addEventListener('click', () => {
        if (streaksContainer.style.display === "grid") {
            streaksContainer.style.display = "none";
        } else {
            streaksContainer.style.display = "grid";
        }
    })

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
        if (currentStreakTotal === 1) {
            dayNumber = '🔥'
        } else {
            dayNumber = '🔥'
        };

        let message;

        if (currentStreakTotal === 0) {
            message = "Crumbs ... let's get back in the habite!";
        } else if (currentStreakTotal > 0 && currentStreakTotal <= 2) {
            message = "Great start!  Keep at it!";
        } else if (currentStreakTotal > 2 && currentStreakTotal <= 7) {
            message = `A habit a day keeps procrastination away!`;
        } else if (currentStreakTotal > 7 && currentStreakTotal <= 14) {
            message = "More than a week effort!";
        } else if (currentStreakTotal > 14) {
            message = "Rehabite-ation not required here!";
        } else {
            message = "Whoops.  No streakers here!";
        }

        let currentStreakMessage = document.createElement('p');
        currentStreakMessage.textContent = `${currentStreakTotal} ${dayNumber} ${message}`;
        streakContainer.appendChild(currentStreakMessage);

        let topStreak = streaks.streakData.top_streak;
        let topStreakMessage = document.createElement('p');
        topStreakMessage.textContent = `✨ Your PB is ${topStreak}! ✨`;
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
        let maxFrequency = habit.max_frequency
        let currentHabitID = habit.user_habit_id

        let habitName = document.createElement('h5')
        habitName.textContent = habit.name

        let habitFrequency = document.createElement('progress')
        habitFrequency.setAttribute('max', maxFrequency)
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
            // currentHabitTotal += 1
            if (currentHabitTotal >= maxFrequency) {
            } else { currentHabitTotal++ }
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
            // currentHabitTotal -= 1
            if (currentHabitTotal === 0) {
            } else { currentHabitTotal-- }
            try {
                requests.deleteData(`users/${username}/habits/entries/${currentHabitID}`);
                updateProgressBar()
            } catch (err) {
                throw err
            }
        });

        let habitsExtrasContainer = document.createElement('div')
        habitsExtrasContainer.className = "habits-extras-container"

        habitSeeMore.addEventListener('click', () => {

            if (habitsExtrasContainer.style.display === "grid") {
                habitsExtrasContainer.style.display = "none";
            } else {
                habitsExtrasContainer.style.display = "grid";
            }

            habitsExtrasContainer.innerHTML = ""

            const dayEntries = habit.day_entries

            const olderEntries = dayEntries.slice(1) // Returns all except first array element i.e. today
            const validEntries = olderEntries.filter(entry => entry.total !== null)
            validEntries.forEach(entry => {
                let habitExtrasContainer = document.createElement('div')
                habitExtrasContainer.className = "habit-extra-item"
                let habitExtrasDate = document.createElement('p')
                habitExtrasDate.className = "extras-date"
                habitExtrasDate.textContent = new Date(entry.date).toLocaleDateString()
                let habitExtrasFrequency = document.createElement('progress')
                habitExtrasFrequency.className = "extras-progress"
                habitExtrasFrequency.setAttribute('max', maxFrequency)
                habitExtrasFrequency.setAttribute('value', entry.total)
                let habitExtraResult = document.createElement('p')
                habitExtraResult.className = "extras-result"
                habitExtraResult.textContent = `${entry.total} / ${maxFrequency}`

                habitExtrasContainer.appendChild(habitExtrasDate)
                habitExtrasContainer.appendChild(habitExtrasFrequency)
                habitExtrasContainer.appendChild(habitExtraResult)
                habitsExtrasContainer.appendChild(habitExtrasContainer)

            })
            habitContainer.appendChild(habitsExtrasContainer)
        })
        habitsContainer.appendChild(habitContainer)
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