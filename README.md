# Bamazon Retail Store Application
This is a command line application that allows users to interact with a retail store's inventory stored in a mySQL database. Three seprate applications exists for the customer, manager, and supervisor of the store. 

### Database Structure
The bamazon database consists of two tables, products and departments. The following screenshots demonstrate how the two tables were setup:

![Image of Tables](https://github.com/udugam/bamazon/blob/master/screenshots/BamazonTables.png)

![Image of Columns](https://github.com/udugam/bamazon/blob/master/screenshots/BamazonColumns.png)

### Customer Experience
The customer application (bamazonCustomer.js) allows a user(customer) to purchase products by ID. Here is the the demo of the [Bamazon Customer Experience](https://youtu.be/15JqEcQBagU)

### Manager Experience
The manager application (bamazonManager.js) allows a user(manager) to view products for sale, view low inventory, add inventory, and add a new product for sale. Low inventory is set at a quantity less than 5. Here is the demo of the [Bamazon Manager Experience](https://youtu.be/kzj6OEj8Tdk)

### Supervisor Experience
The supervisor application (bamazonSupervisor.js) allows a user(supervisor) to view products sales by department and add new departments. The products sales by department option will print to the console all departments that have products for sale while summing up the total sales and calculating the total profit. Overhead costs are pre-set in the program code. Please also note that when a new department is added, it will not show up on the product sales table until a supervisor adds a product to the department. Here is the demo of the [Bamazon Supervisor Experience](https://youtu.be/tgTuOKWlBzs)




