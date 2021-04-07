const req  = require("./requests");
const forms = require("./forms");
const heading = document.querySelector('header');
const main = document.querySelector('main');

async function renderAddHabitsPage() {
    const showFooter = document.getElementById('footer')
    showFooter.style.display = 'block';
    // add greeting
    const greeting = document.createElement('h1')
    greeting.textContent = "Let's get started..."
    heading.appendChild(greeting)

    const addHabitForm = document.createElement("div");
    addHabitForm.className = "form-container";
    // addHabitForm.appendChild(addHabitForm());
    
     // add habits to dropdown
     const habitsDropdown = document.createElement("select");
     const habits = await req.get('habits');
     
     habits.forEach(habit => {
         const option = document.createElement("option");
         option.textContent = habit.name;
         habitsDropdown.appendChild(option)
     });
 
     // create form
     addHabitForm.innerHTML = `    
     <form action="" method="POST" class="add-habit-form">
         <div class="habits-dropdown"> 
             <label for="habits">Choose a habit to track</label>
             ${habitsDropdown.outerHTML}
         </div>
  
         <div class="frequency-input">
             <label for="frequency">How many times per day?</label>
             <input type="number" name="frequency">
         </div>
         <input type="button" value="Start Tracking">
     </form>
     `

     console.log(addHabitForm);
    main.appendChild(addHabitForm)
}

async function addHabitForm() {
   // add a new user habit from a list
     
     return addHabitForm;
}

async function createNewHabitForm() {
    // create a new habit and add it to habits list (POST) 

//     <div class="add-habit-input">
//     <label for="new-habit">Or add a custom one!</label>
//     <input type="text" name="new-habit" id="new-habit">
//     <button><i class="fas fa-plus-circle"></i></button>
// </div>
}

async function deleteHabitForm() {
    // delete a user habit so it is no longer tracked
}

module.exports = {renderAddHabitsPage};