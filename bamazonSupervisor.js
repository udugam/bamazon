var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displaySupervisorOptions();
  });

//This function displays the supervisor's options
function displaySurpervisorOptions() {
    inquirer
    .prompt([
        {
            type:"list",
            name:"action",
            message:"Choose an action",
            choices:['View Product Sales by Department','Create New Department']
        },
    ])
    .then(answer => {
        switch(answer.action) {
            case 'View Product Sales by Department':
                viewDepartmentSales()
                break

            case 'Create New Department':
                createDepartment()
                break
        }
    });
}