// Generation .env secret key
const fs = require('fs')
const key = require('crypto').randomBytes(64).toString('hex');
const file = "../api/.env";
fs.writeFile(file, `SECRET=${key}`, () => {});