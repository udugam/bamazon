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
  displayInventory();
});


//This function querys the database for all rows of data and prints them to the console
function displayInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        res.forEach(function(product) {
            console.log(`${product.item_ID} | ${product.product_name} | ${product.department_name} | $${product.price} | ${product.stock_quantity}`)
        });
        customerActionsPrompt()
    });
}

function customerActionsPrompt() {
    inquirer
        .prompt([
        {
            type:"input",
            name:"productID",
            message:"What product would you like to purchase (Enter ID Number)",
        },
        {
            type:"input",
            name:"productQty",
            message:"How many would you like to buy?",
        },

        ])
        .then(answer => {
            purchaseItem(answer.productID, answer.productQty)
        });
}

//This function receives the productID and Qty as arguments and queries the database for the corresponsing row.
//An inventory check is done before the purchase total is displayed to the user
function purchaseItem(productID,purchaseQty) {
    var query = `SELECT * FROM products WHERE item_ID=${productID}`;
    connection.query(query, function(err, res) {
        if(err) {
            console.log(err)
         } else {
           var product = res[0]
           product.stock_quantity > purchaseQty ? validPurchase(product,purchaseQty) : invalidPurchase() //Check inventory before processing purchase
        }     
    });
}

//This function is called when there is not enough inventory for the purchase.
//User is notified then Inventory is redisplayed to the user
function invalidPurchase() {
    console.log('Insufficient quantity!')
    displayInventory()
}

//This function is called when there is enough inventory.
//New Stock Quantity is calculated then sent to the database as an UPDATE
//Purchase total is displayed to user and Updated Inventory is redisplayed to the User
function validPurchase(product,purchaseQty) {
    var newStockQty = product.stock_quantity-purchaseQty
    var query = `UPDATE products SET stock_quantity=${newStockQty} WHERE item_ID=${product.item_ID}`;
    connection.query(query, function(err, res) {
        if(err) {
            console.log(err)
         } else {
            var cost = product.price*purchaseQty
            console.log(`Total cost of purchase is $${cost}`)
            displayInventory()
        }     
    });
}




