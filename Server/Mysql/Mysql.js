const mysql = require('mysql');
const dbConfig = require("../Config/config");

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});


connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});


module.exports = connection;