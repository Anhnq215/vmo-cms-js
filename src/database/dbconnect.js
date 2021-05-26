// const mysql = require('mysql2')
const mysql = require('mysql2');

const client = mysql.createConnection({host:'localhost', port:3306, user:'root', database: 'vmo'});
console.log('connected client');

module.exports = client.promise();

