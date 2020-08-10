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
    inquirer
        .prompt([
            {
                name: "createDept",
                type: "input",
                message: "Enter new department name: ",
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?",
                {
                    deptName: answer.createDept
                },
                function (err) {
                    if (err) {
                        throw err;
                    }
                }
            )
            console.table(answer);
            console.log(` ==========  Success! Your new department has been added ========== `);
            start();
        })
        
}
function newRole() {
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "Enter the job title for new role: "
            },
            {
                name: "roleWage",
                type: "input",
                message: "Enter the salary for this role: "
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO role SET ?",
                {
                    title: answer.role,
                    salary: answer.roleWage,
                },
                function (err) {
                    if (err) {
                        throw err;
                    }
                }
            ),

                console.table(answer);
            console.log(` ==========  Success! Your new department has been added ========== `);
            start();
        });

}
function newEmployee() {
    // connect to db for role list and information to attach to new employee
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "Enter new employee's fisrt name: ",
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "Enter new employee's last name: "
                },
                {
                    name: "role",
                    type: "list",
                    message: "Select new employee's role: ",
                    choices: function () {
                        var roleArr = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArr.push(res[i].title);
                        }
                        return roleArr;
                    },

                }
            ])
            //   add role id from query res 
            .then(function (answer) {
                let roleId;
                for (let j = 0; j < res.length; j++) {
                    if (res[j].title == answer.role) {
                        roleId = res[j].id;
                        console.log(roleId)
                    }
                }
                connection.query("INSERT INTO employee SET ?",
                    {
                        firstName: answer.firstName,
                        lastName: answer.lastName,
                        roleId: roleId,
                    },
                    function (err) {
                        if (err) throw err;
                        console.table(answer);
                        console.log(` ==========  Success! Your new employee has been created ========== `);
                        start();
                    }
                )
            })
    })
}
function viewRoles() {
    connection.query("SELECT role.id, role.title, department.deptName AS department, role.salary FROM role LEFT JOIN department on role.deptId = department.id;", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();

    }
    )
}

function viewDepts() {
    connection.query("SELECT department.id, department.deptName FROM employee LEFT JOIN role on employee.roleId = role.id LEFT JOIN department on role.deptId = department.id GROUP BY department.id, department.deptName;", function(err, results) {
        if (err) throw err;
        console.table(results);
        start();
    }
    )
}

function viewEmployees() {
    connection.query("SELECT employee.id, employee.firstName, employee.lastName, role.title, role.salary FROM employee_db.employee LEFT JOIN role on role.id = roleId", function (err, results) {
        if (err) throw err;
        console.table(results)
        start();
    }
    )
}
