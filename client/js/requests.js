const auth = require('./auth')
const hostURL = "http://localhost:3000";

async function getAllHabits() {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const username = auth.currentUser()
        console.log(username)
        const response = await fetch(`${hostURL}/users/${username}/habits`, options)
        // https://habit-your-way.herokuapp.com/habits 
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

async function get(path) {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch(`${hostURL}/${path}`, options)
        const data = await response.json();
        // if (data.err) {
        //     console.warn(data.err);
        //     logout();
        // }
        return data;
    } catch (err) {
        console.warn(err);
    }
}


async function post(path, data) {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${hostURL}/${path}`, options)
        const data = await response.json();
        // if (data.err) {
        //     console.warn(data.err);
        //     logout();
        // }
        return data;
    } catch (err) {
        console.warn(err);
    }
}



module.exports = { getAllHabits, getAllUsers, get}