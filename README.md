# Fast Shopping App | Sancrisoft Skills Test
Fast Shopping App is a simple application platform that allows vistors to order their products online. The basic idea is to build an app that list different purchasable products on the homepage.

User must also be able to sort each product by **Alpha Order**, **Lower Price** and **Most Recent**. They can then select their products which will be added to their shopping cart. The cart should then contains all items the user added to complete the order. To do this, they will be redirected to a age to fill in their personal information and location for delivery. The shopping cart should also allow the user to increment the quantity of each product, display each price and the subtotal of the order. Once the order is made, the user must be redirected to a Thank You page notifying them about their successful order.

## Technologies
  *Frontend*
  - JavaScript | ES6+
  - ReactJS
  - Redux | Redux Sagas | Redux Persit
  - CSS3 | Flexbox
  - FontAwesome (for icons)

- *Backend*
  - NodeJS | ExpressJS
  - MySQL | Sequelize

- *Architechure*
  - MVC(Model-View-Controller)
  - One Way Data Binding and Two Way Data Binding(Neccessary for some actions)


## How To Run The Fast Shopping App
Follow these steps. Beforehand, make sure you are running a MySQL instance on your machine.

**1- Make a clone of the app**
  * `git clone https://github.com/stevendaye/fast-shopping-app`

**2- Go to the root of the project**
  * `cd fast-shopping-app`

**3 Intall required dependencies**
*Frontend*
  * `cd client/`
  * `npm i`

*Backend*
  * `cd ../`(project root)
  * `npm i`

**4 Start up the application at the root of the project**
  - `npm run dev`

NB: Should anything go wrong in the installation proccess, try forcing the installation (I am quite sure you won't need to though). When successful you should see the message `Shopping Server listening at http://localhost:8080`.

## SQL Queries
When running the application in development, you will need to create the app's database first before any other query.
 - `CREATE DATABASE fastshopping;` -- Create a database name **fastshopping**
 - `USE fastshopping;` -- to switch the database
 - `SELECT * FROM Products` -- to retrieve all products automatically stored in the database at startup
 - `SELECT * FROM Categories` -- to retrieve all categories automatically stored in the database at startup
 - `SELECT * FROM ProductCategories` -- to retrieve a list of relationship, between Products and Categories(Each product can belong to one or many categories).
 - `SELECT * FROM Orders` -- to retrieve a list of orders made by various users.
 - `SELECT * FROM ProductOrders` --  to retrieve all products attached to an order, including each of their quantities.
 - `SELECT * FROM Users` -- to retrieve all users who once placed an order on the platform.

NB: You can see the database *name* and *password* in the YAML configuration file at the root of the project. For simplicity sake, both are named **root**

## Frontend & Backend file organisation
The whole application follows a consistent architecture a code style. We are talking of a *Unique Source of Trutth*, seperation of concerns between *Models*, *Controlers*, *State Layer* and *View Layer*. So, to make things simple, I included in a less than 10 minutes video file the application structure.

## Routes & Descriptions
*Frontend*
  - `/` -- Main page(Products board)
  - `/cart`-- Cart Page (Message is dispayed if nothing was added in the cart)
  - `/checkout`-- Checkout Page (Message is displayed if there is no product to checkout)
  - `/Thanks`-- Thanks Page (Message is displayed if there no recent orther)

*Backend*
  - `/products/save` -- Save all available products recorded in a json file into the database. You can add more of your own products in the json file. Just make sure that each product title corresponds to the image name and that each product belongs to one or more categries. See ./client/src/config/ for these configuration files.
  - `/products/list?page=1&hitsPerPage=8` -- Retrieve a paginated list of products from the mysql database(8 per page)
  - `/products/check/:id` -- Checks for a specific product before saving in the database.
  
  - `/user/save` -- Save a user unpon order placed.
  - `/user/check/:email` --  Check a particular user on lookup
  
  - `/categories/save` -- Save all available categories in the json configuration file.
  - `/categories/save/product-categories` --  Route to a joint table that saves relationship between the **Products** and **Categories** table in a new table called *ProductCategroies*.

  - `/orders/save` --  Save a user's order in the database.
  - `/orders/save/product-orders` -- Route to a joint table that saves relationship between the **Products** and **Orders** table in a new table called **ProductOrders**.

  Additional route features and logic implemented 

  - `/categories/list/` --  Will retrieve all available categories there are in the database.
  - `/categories/check/?id=id&page=1&hitsPerPage=12:` -- Assuming a user click on a particular category, this will retrieve a paginated list of all products belonging to  that category(12 per page).

  - `/orders/list` -- Will retrieve all orders made by users from the database
  - `/orders/check/:id` -- Will retrieve a specific order from the database


## Features Delivery
All features have been delivered with no trade-offs, these aslo include responsiveness on all sort of devices. However, I built the application in such a way that it can be easily extended if I was ever asked to work again on it or add more features. Additional features like *User Authentication*, *Keeping track of all orders and retriveing specific ones for each user*, and the *Integration of a Microserice Architecture* were well taught and initiated since the design process.

## Additional Links
I included as required the ERD of the application. It is a link that can be viewed bellow. However I also included a loom video link that takes you through the application in a nutshell. In this, I talked about the challenges I faced, the process, the app structure and why it took me that much time.

Appication ERD: https://app.lucidchart.com/invitations/accept/af8741cc-f83b-4589-9d78-259d6f20f325

Loom Record: https://www.loom.com/share/665a7a1f030d4b05bc8ad683ad9dee7a

Code Base: https://github.com/stevendaye/fast-shopping-app
