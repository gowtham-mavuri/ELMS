const mysql = require('mysql2-promise')();

mysql.configure(
    {
        user:"root",
        host:"localhost",
        password:"1234",
        database:"elmsdb",
        timezone:'utc'
    }
);

module.exports = mysql;