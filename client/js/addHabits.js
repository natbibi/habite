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
    addHabitForm.id = "add-habit-form";
    addHabitForm.className = "form-container";
    const addHabitFormHeading = document.createElement("h2");
    addHabitFormHeading.textContent = "Track a habit";

    addHabitForm.appendChild(addHabitFormHeading);
    addHabitForm.appendChild(createAddHabitForm());

    // render create habit form
    const newHabitForm = document.createElement("div");
    newHabitForm.id = "new-habit-form";
    newHabitForm.className = "form-container";
    const newHabitFormHeading = document.createElement("h2");
    newHabitFormHeading.textContent = "Create a new habit";

    newHabitForm.appendChild(newHabitFormHeading);
    newHabitForm.appendChild(createNewHabitForm());

    const deleteHabitForm = document.createElement("div");
    deleteHabitForm.id = "delete-habit-form";
    deleteHabitForm.className = "form-container";
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
        { tag: 'label', attributes: { id: 'add-habits-dropdown-label', for: 'habits-dropdown' }, text: 'I want to' },
        { tag: 'select', attributes:{ id: 'add-habits-dropdown', name: 'habits-dropdown' } },
        { tag: 'input', attributes: { id: 'add-habits-frequency', name: 'frequency', type: 'number', placeholder: 'e.g 3', min: "1", max: "24", required: "true" } },
        { tag: 'label', attributes: { id: 'add-habits-frequency-label', for: 'frequency' }, text: 'times per day' },
        { tag: 'button', attributes: { class: 'add-habit-btn', type: 'submit', name: 'habit-sbmt'}, text: "Track"}
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

    form.onsubmit = async (e) => {
        e.preventDefault();
        const selected = habitsDropdown.options[habitsDropdown.selectedIndex].getAttribute('data-id');
        // check if habit is already being tracked
        const currentHabits = await req.getData(`users/${auth.currentUser()}/habits`);
        const isTracked = currentHabits.some(habit => habit.habit_id == selected);
        const btn = e.target.querySelector('button');

        if (!isTracked) {
            const path = `users/${auth.currentUser()}/habits`
            const data = {
                habit_id: selected,
                frequency: freqInput.value
            }
            req.postData(path, data);

            inputFeedback(btn, "Tracked!", true);

        } else {
            inputFeedback(btn, "Already tracked!", false);
        }
        form.reset();
    };

    return form;
}

function createNewHabitForm() {
    fields = [
        { tag: 'label', attributes: { class: 'new-habit-name', for: 'new-habit-name' }, text: 'Habit name' },
        { tag: 'input', attributes: { class: 'new-habit-name', name: 'new-habit-name', type: 'text', placeholder: 'e.g noodle farming', required: "true" }, text: 'Add a custom habit' },
        { tag: 'button', attributes: { class: 'new-habit-btn', type: 'submit', name: 'new-habit-sbmt' }, text: "Add" }
    ];

    const form = forms.createForm(fields);
    const nameInput = form.querySelector('input[type=text]');

    form.onsubmit = async (e) => {
        e.preventDefault();

        const allHabits = await req.getData(`habits`);
        const exists = allHabits.some(habit => habit.name.includes(nameInput.value));

        const btn = e.target.querySelector('button');

        if (!exists) {
            const data = { name: nameInput.value }
            await req.postData(`habits`, data);
            form.reset();
            await refreshForm(document.getElementById("add-habit-form"));
            inputFeedback(btn, "Added!", true);
        } else {
            inputFeedback(btn, "Exists!", false);
        }
        
    };

    return form;
}

function createDeleteHabitForm() {
    fields = [
        { tag: 'label', attributes: { class: 'delete-habit', for: 'delete-habit-dropdown' }, text: "I don't want to" },
        { tag: 'select', attributes: { class: 'delete-habit', name: 'delete-habit-dropdown' } },
        { tag: 'button', attributes: { class: 'delete-habit-btn', type: 'submit', name: 'delete-habit-sbmt' }, text: "Delete" }
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
        const btn = e.target.querySelector('button');
        const selected = userHabitsDropdown.options[userHabitsDropdown.selectedIndex].getAttribute('data-id');
        await req.deleteData(`users/${auth.currentUser()}/habits/${selected}`);
        form.reset();
        
        await refreshForm(document.getElementById("delete-habit-form"));
        
       
    };

    return form;
}

async function refreshForm(container) {
    const formName = container.id;
  
    let newForm;
    switch(formName) {
        case "add-habit-form": newForm = await createAddHabitForm(); break;
        case "new-habit-form": newForm = await createNewHabitForm(); break;
        case "delete-habit-form": newForm = await createDeleteHabitForm(); break;
        default: break;
    }

    const oldForm = container.querySelector("form");
    container.replaceChild(newForm, oldForm);
}

function inputFeedback(element, text, success) {
    const prevText = element.textContent;
    element.textContent = text;
    const className = success ? "input-success" : "input-fail";
    element.classList.toggle(className);
    setTimeout(() => {
        element.textContent = prevText;
        element.classList.toggle(className);
    }, 2000)
}

module.exports = { 
    renderAddHabitsPage,
    createAddHabitForm,
    createDeleteHabitForm,
    createNewHabitForm
};