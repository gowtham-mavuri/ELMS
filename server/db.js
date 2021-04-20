const mysql = require('mysql2-promise')();

mysql.configure(
    {
        user:"root",
        host:"localhost",
        password:"priya",
        database:"elmsdb",
        timezone:'utc'
    }
);

module.exports = mysql;