const req = require("./requests");
const forms = require("./forms");
const auth = require('./auth')
const heading = document.querySelector('header');
const main = document.querySelector('main');

function renderAddHabitsPage() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
    // add greeting
    const greeting = document.createElement('h1')
    greeting.textContent = "Let's get started..."
    heading.appendChild(greeting)

    // render add habit form
    const addHabitForm = document.createElement("div");
    addHabitForm.className = "form add-habit-form";
    const addHabitFormHeading = document.createElement("h2");
    addHabitFormHeading.textContent = "Track a habit";

    addHabitForm.appendChild(addHabitFormHeading);
    addHabitForm.appendChild(createAddHabitForm());

    // render create habit form
    const newHabitForm = document.createElement("div");
    newHabitForm.className = "form new-habit-form";
    const newHabitFormHeading = document.createElement("h2");
    newHabitFormHeading.textContent = "Create a new habit";

    newHabitForm.appendChild(newHabitFormHeading);
    newHabitForm.appendChild(createNewHabitForm());

    const deleteHabitForm = document.createElement("div");
    deleteHabitForm.className = "form delete-habit-form";
    const deleteHabitFormHeading = document.createElement("h2");
    deleteHabitFormHeading.textContent = "Stop tracking a habit";

    deleteHabitForm.appendChild(deleteHabitFormHeading);
    deleteHabitForm.appendChild(createDeleteHabitForm());

    main.appendChild(addHabitForm);
    main.appendChild(newHabitForm);
    main.appendChild(deleteHabitForm);
}

function createAddHabitForm() {
    // form fields
    fields = [
        { tag: 'label', attributes: { id: 'add-habits-dropdown', for: 'habits-dropdown' }, text: 'Choose a habit:' },
        { tag: 'select', attributes:{ id: 'add-habits-dropdown', name: 'habits-dropdown' } },
        { tag: 'label', attributes: { id: 'add-habits-frequency', for: 'frequency' }, text: 'How often?' },
        { tag: 'input', attributes: { id: 'add-habits-frequency', name: 'frequency', type: 'number', placeholder: '3', min: "1", max: "24", required: "true" } },
        { tag: 'p', attributes: {},  text: "times per day" },
        { tag: 'input', attributes: { id: 'add-habits-btn', type: 'submit', name: 'habit-sbmt', value: 'Track Habit' } }
    ];

    const form = forms.createForm(fields);
    const freqInput = form.querySelector("input[name='frequency']");
    const habitsDropdown = form.querySelector("select");

    // add habits to dropdown     
    req.getData('habits')
        .then(habits => {
            habits.forEach(habit => {
                const option = document.createElement("option");
                option.textContent = habit.name;
                option.setAttribute('data-id', habit.id);
                habitsDropdown.appendChild(option)
            })
        });

    form.onsubmit = (e) => {
        e.preventDefault();
        const selected = habitsDropdown.options[habitsDropdown.selectedIndex].getAttribute('data-id');
        const path = `users/${auth.currentUser()}/habits`
        const data = {
            habit_id: selected,
            frequency: freqInput.value
        }
        req.postData(path, data);
    };

    return form;
}

function createNewHabitForm() {
    fields = [
        { tag: 'label', attributes: { class: 'new-habit-name', for: 'new-habit-name' }, text: 'Add a custom habit' },
        { tag: 'input', attributes: { class: 'new-habit-name', name: 'new-habit-name', type: 'text', placeholder: 'use habite', required: "true" }, text: 'Add a custom habit' },
        { tag: 'input', attributes: { class: 'new-habit-btn', type: 'submit', name: 'new-habit-sbmt' } }
    ];

    const form = forms.createForm(fields);
    const nameInput = form.querySelector('input[type=text]');

    form.onsubmit = async (e) => {
        e.preventDefault();
        const data = { name: nameInput.value }
        req.postData(`habits`, data);
    };

    return form;
}

function createDeleteHabitForm() {
    fields = [
        { tag: 'label', attributes: { class: 'delete-habit', for: 'delete-habit-dropdown' }, text: 'Habit' },
        { tag: 'select', attributes: { class: 'delete-habit', name: 'delete-habit-dropdown' } },
        { tag: 'input', attributes: { class: 'new-habit-btn', type: 'submit', name: 'new-habit-sbmt' } }
    ];


    const form = forms.createForm(fields);
    const userHabitsDropdown = form.querySelector("select");

    req.getData(`users/${auth.currentUser()}/habits`)
        .then(habits => {
            habits.forEach(habit => {
                const option = document.createElement("option");
                option.textContent = habit.habit_name;
                option.setAttribute('data-id', habit.id);
                userHabitsDropdown.appendChild(option)
            })
        });


    form.onsubmit = async (e) => {
        e.preventDefault();
        const selected = userHabitsDropdown.options[userHabitsDropdown.selectedIndex].getAttribute('data-id');
        req.deleteData(`users/${auth.currentUser()}/habits/${selected}`);
    };

    return form;
}

module.exports = { renderAddHabitsPage };