var inquirer = require('inquirer');
var mysql = require("mysql");
var cTable = require("console.table")

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
function displaySupervisorOptions() {
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

//This function will output all the sales by department into a table
function viewDepartmentSales() {
    var query = "SELECT departments.department_id,departments.department_name,departments.over_head_costs, SUM(products.product_sales) AS product_sales, SUM(products.product_sales-departments.over_head_costs) AS total_profit FROM bamazon.departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY department_id,department_name,over_head_costs";
    connection.query(query, function(err,res) {
        if(err) {
            console.log(err)
        } else {
            console.table(res)
        }
    })
}

//This function will create a new department
function createDepartment() {
    inquirer
    .prompt([
        {
            type:"input",
            name:"departmentName",
            message:"Enter the name of the new Department"
        },
        {
            type:"input",
            name:"overHead",
            message:"What are the overhead costs of this department?"
        },
    ])
    .then(answer=> {
        connection.query("INSERT INTO departments SET ?", 
            {
                department_name: answer.departmentName,
                over_head_costs: answer.overHead
            },
            function(err,res) {
                if(err) {
                    console.log(err)
                } else {
                    displaySupervisorOptions()
                }
            })
    })
}
