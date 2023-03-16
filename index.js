// create the dependencies
const mySql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const figlet = require("figlet");
const { first } = require("rxjs");
const log = console.log;
const tableLog = console.table;

// figlet('EMPLOYEE TRACKER!!', function (err, data) {
//     if (err) {
//         console.log('Please reopen app!');
//         console.dir(err);
//         return;
//     }
// })

// Connect to the database using dbnode
const dbConnection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employeeDb",
});

dbConnection.connect(function (err) {
  if (err) throw err;

  //log the connection using thread id
  log(`Successfully connected as id ${dbConnection.threadId}!`);

  // this will start the figlet fucntion
  // firstPrompt();
});

// firstPrompt function - this will prompt the user with the choices to execute
function firstPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all employees by Manager",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update employee manager",
          "View all roles",
          "Add role",
          "Remove role",
          "View all departments",
          "Add a department",
          "Remove department",
          "View department budgets",
          "Quit",
        ],
      },
    ])
    // switch/case statement for the user input
    .then(function (val) {
      switch (val.choices) {
        //"View all employees", user input
        case "View all employees":
          viewAllEmployees();
          break;

        // "View all employees by department",user input
        case "View all employees by department":
          employeesByDept();
          break;

        // "View all employees by Manager", user input
        case "View all employees by Manager":
          employeesByMngr();
          break;

        //"Add employee", user input
        case "Add employee":
          addEmployee();
          break;

        // "Remove employee", user input
        case "Remove employee":
          removeEmployee();
          break;

        //   "Update employee role", user input
        case "Update employee role":
          updateEmployee();
          break;

        // "Update employee role", user input
        case "Update employee role":
          updateEmploRole();
          break;

        //"Update employee manager", user input
        case "Update employee manager":
          updateEmploMngr();
          break;

        // "View all roles", user input
        case "View all roles":
          viewAllRoles();
          break;

        //"Add role", user input
        case "Add role":
          addRole();

        // "Remove role", user input
        case "Remove role":
          removeRole();
          break;

        //"View all Departments", user input
        case "View all departments":
          viewAllDepartments();
          break;

        //"Add a department", user input
        case "Add a department":
          addDept();
          break;

        //"Remove Department", user input
        case "Remove department":
          removeDept();
          break;

        // "View department budgets"
        case "View department budgets":
          deptBudgets();
          break;

        // "Quit the app"
        case "Quit":
          quit();
      }

      //-------------------------------------------------------------------------//
      // view all employees function
      function viewAllEmployees() {
        const query = "SELECT * FROM employee";
        dbConnection.query(query, (err, res) => {
          if (err) throw err;
          tableLog(res);

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//

      // view all employees by department function
      function employeesByDept() {
        const query = `SELECT employee.first_name, 
            employee.last_name,
                department.name AS department
               FROM employee 
               LEFT JOIN role ON employee.role_id = role.id 
               LEFT JOIN department ON role.department_id = department.id`;
        dbConnection.query(query, (err, res) => {
          if (err) throw err;
          tableLog(res);

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
      function employeesByMngr() {
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function addEmployee() {
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function removeEmployee() {
        const query = "";
      }

      //-------------------------------------------------------------------------//
      function updateEmployee() {
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function updateEmploRole() {
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function updateEmploMngr() {
        const query = "";
      }

      //-------------------------------------------------------------------------//
      function viewAllRoles() {
        const query = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;
        dbConnection.query(query, (err, res) => {
          if (err) throw err;
          tableLog(res);

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
      function addRole() {
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function removeRole() {
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function viewAllDepartments() {
          const query = 'SELECT * FROM department';
        dbConnection.query(query, (err, res) => {
          if (err) throw err;
          tableLog(res);

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
      function addDept() {
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function removeDept() {
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function removeDept() {
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function deptBudgets() {
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function quit() {
        console.log("Have a good day! ");
        process.exit();
      }
      //-------------------------------------------------------------------------//
    }); // end of .then function
} // end of first prompt function

// firstPrompt end
firstPrompt();
