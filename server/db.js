const mysql = require('mysql2-promise')();

mysql.configure(
    {
        user:"root",
        host:"localhost",
        database:"elmsdb",
        password:"1234",
        timezone:'utc'
    }
);

module.exports = mysql;