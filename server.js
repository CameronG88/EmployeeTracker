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
            name: "menu",
            type: "list",
            message: "What would you like to do? ",
            choices: [
                "Add new department",
                "Add new role",
                "Add new employee",
                "View all departments",
                "View all roles",
                "View all employees",
                "Update employee role",
                "Exit"
            ]
        })
        // write switch function for menu selection
        .then(({ menu }) => {
            switch (menu) {
                case "Add new department":
                    newDepartment();
                    break;

                case "Add new role":
                    newRole();
                    break;

                case "Add new employee":
                    newEmployee();
                    break;

                case "View all roles":
                    viewRoles();
                    break;

                case "View all departments":
                    viewDepts();
                    break;

                case "View all employees":
                    viewEmployees();
                    break;
            }
        })
}
// ===================== menu functions ==================== 
function newDepartment() {

}
function newRole(){

}
function newEmployee(){

}
function viewRoles(){

}
function viewDepts(){

}
function viewEmployees(){

}