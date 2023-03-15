// create the dependencies
const mySql = require("mysql2");
const inquire = require("inquire");
const consoleTable = require("console.table");
const figlet = require("figlet");

//figlet module prompt
figlet("EMPLOYEE TRACKER", function (err, data) {
  if (err) {
    console.log("Please restart the app!");
  }
  console.log(data);
});

// Connect to the database using dbnode i
const dbConnection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employeeDb",
});
