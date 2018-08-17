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
  displayManagerOptions();
});

//This function displays the managers options
function displayManagerOptions() {
    inquirer
    .prompt([
        {
            type:"list",
            name:"action",
            message:"Choose an action",
            choices:['View Products for Sale','View Low Inventory', 'Add to Inventory','Add New Product']
        },
    ])
    .then(answer => {
        switch(answer.action) {
            case 'View Products for Sale':
                viewProducts()
                break

            case 'View Low Inventory':
                viewLowInventory()
                break
            
            case 'Add to Inventory':
                addInventory()
                break

            case 'Add New Product':
                addProduct()
                break
        }
    });
}

//This function displays the products that are for sale
function viewProducts() {
    var query = `SELECT * FROM products`;
    connection.query(query, function(err, res) {
        res.forEach(function(product) {
            console.log(`${product.item_ID} | ${product.product_name} | ${product.department_name} | $${product.price} | ${product.stock_quantity}`)
        });
        displayManagerOptions()
    });
}

//This function displays the products that have a quantity less than 5
function viewLowInventory() {
    var query = `SELECT * FROM products WHERE stock_quantity<5`;
    connection.query(query, function(err, res) {
        res.forEach(function(product) {
            console.log(`${product.item_ID} | ${product.product_name} | ${product.department_name} | $${product.price} | ${product.stock_quantity}`)
        });
        displayManagerOptions()
    });
}

//This function allows the user to add inventory to a selected product
function addInventory() {
    inquirer
    .prompt([
        {
            type:"input",
            name:"productID",
            message:"Which product would you like to add more inventory of? (Enter ID Number)"
        },
        {
            type:"input",
            name:"qtyToAdd",
            message:"How many would you like to add to inventory?"
        },
    ])
    .then(answer => {
        var queryProduct = `SELECT * FROM products WHERE item_ID=${answer.productID}`;
        connection.query(queryProduct, function(err, res) {
            if(err) {
                console.log(err)
            } else {
                var product = res[0]
                var newInventory = product.stock_quantity+parseInt(answer.qtyToAdd)
                var queryNewInventory = `UPDATE products SET stock_quantity=${newInventory} WHERE item_ID=${product.item_ID}`;
                connection.query(queryNewInventory, function(err,res) {
                    if(err) {
                        console.log(err)
                    } else {
                        viewProducts()
                    }
                })
            }     
        });
    });
}

function addProduct() {
    inquirer
    .prompt([
        {
            type:"input",
            name:"productName",
            message:"What is the name of the new product?"
        },
        {
            type:"input",
            name:"department",
            message:"What department does it belong too?"
        },
        {
            type:"input",
            name:"price",
            message:"What will be the retail price of the product?"
        },
        {
            type:"input",
            name:"qty",
            message:"What is the initial quantity?"
        },
    ])
    .then(answer => {
        connection.query("INSERT INTO products SET ?", 
        {
            product_name : answer.productName,
            department_name : answer.department,
            price : answer.price,
            stock_quantity : answer.qty
        }, function(err, res) {
            if(err) {
                console.log(err)
            } else {
                viewProducts()
            }     
        });
    });
}

