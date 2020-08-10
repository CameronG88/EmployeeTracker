// require dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");

// create the connection to the db
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
//   use your sql username and password
  user: "root",
  password: "root",
  database: "employee_db"
});

// connect to the mysql server and database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function to initialize inquire prompts
  start();
});

// prompts user with the intial question by given a menu to select a query from
function start() {
  inquirer
    .prompt({