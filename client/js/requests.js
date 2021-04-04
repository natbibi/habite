async function getAllHabits() {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch('https://habit-your-way.herokuapp.com/habits', options);
        const data = await response.json();
        if (data.err) {
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getAllUsers() {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch('https://habit-your-way.herokuapp.com/users', options);
        const data = await response.json();
        if (data.err) {
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

module.exports = { getAllHabits, getAllUsers }