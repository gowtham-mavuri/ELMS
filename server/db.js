const mysql = require('mysql2-promise')();

mysql.configure(
    {
        user:"root",
        host:"localhost",
        password:"Annavaram@123",
        database:"ELMS",
        timezone:'utc'
    }
);

module.exports = mysql;