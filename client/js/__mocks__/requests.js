const habits = [{id: 1, name: "study"}];


async function getData(path) {
    try {
        return habits;
    } catch (err) {
        console.warn(err);
    }
}


async function postData(path, formData) {
    try {
        return;
    } catch (err) {
        console.warn(err);
    }
}

async function deleteData(path) {
    try {
        return;
    } catch (err) {
        console.warn(err);
    }
}

module.exports = { getData, postData, deleteData }
