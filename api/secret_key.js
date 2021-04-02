// Generation .env secret key
const fs = require('fs')
const key = require('crypto').randomBytes(64).toString('hex');
const file = ".env";
fs.writeFile(file, `SECRET=${key}`, (err) => {
    if(err) throw err;
    console.log('Generated Secret Key (shh!)');
});