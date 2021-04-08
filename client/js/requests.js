async function getData(path) {
    try {
        const options = {
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        const response = await fetch(`${hostURL}/${path}`, options)
        const data = await response.json();
        if (data.err) {
            console.warn(data.err);
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}


async function postData(path, formData) {
    try {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(formData)
        }
        const response = await fetch(`${hostURL}/${path}`, options);
        return response.json();
    } catch (err) {
        console.warn(err);
    }
}

async function deleteData(path) {
    try {
        const options = {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': localStorage.getItem('token') }),
        }
        await fetch(`${hostURL}/${path}`, options);
        return
    } catch (err) {
        console.warn(err);
    }
}

module.exports = { getData, postData, deleteData }
