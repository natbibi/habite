const auth = require('./auth')
const hostURL = "http://localhost:3000";
const username = auth.currentUser();

async function getAllHabits() {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch(`${hostURL}/users/${username}/habits/entries`, options)
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

async function postData(url = '', formData = {}) {
    try {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(formData)
        }
        const response = await fetch(url, options);
        return response.json();
    } catch (err) {
        console.warn(err);
    }
}

async function deleteData(url = '', id) {
    try {
        const options = {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        await fetch(url, options);
        location.reload();
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

const getUserHabits = () => get(`users/${username}/habits`);

// async function decrementHabit(id) {
//     try {
//         const options = {
//             method: 'DELETE',
//             headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
//         }
//         await fetch(`${hostURL}/users/${username}/habits/entries/${id}`, options);
//         window.location.hash = `#profile`
//     } catch (err) {
//         console.warn(err);
//     }
// }

// async function addUserhabit(formData) {
//     try {
//         const options = {
//             method: 'POST',
//             headers: new Headers({
//                 'Authorization': localStorage.getItem('token'),
//                 'Content-Type': 'application/json'
//             }),
//             body: JSON.stringify(formData)
//         }
//         console.log((options.body));
//         const response = await fetch(`${hostURL}/users/${username}/habits`, options);
//         const data = await response.json();
//         window.location.hash = "addhabits"
//         if (data.err) {
//             console.warn(data.err);
//             // logout();
//         }
//         console.log("Added ");
//         return data;
//     } catch (err) {
//         console.warn(err);
//     }
// }


module.exports = { getAllHabits, getUserHabits, get, postData, deleteData }
