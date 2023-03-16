// create the dependencies
const mySql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const figlet = require("figlet");
const { first } = require("rxjs");
const log = console.log;
const tableLog = console.table;
const chalk = require("chalk")


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
        const query = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
                      FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;
        dbConnection.query(query, (err, res) => {
          if (err) throw err;
          tableLog(res);
            log(chalk.bgMagenta(`Here is a full list of all the Employees!`))

            log(chalk.red(`=======================================================================================`))

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

            log(chalk.bgMagenta(`Here is a view of all the Employees by Department!`))

            log(chalk.red(`=======================================================================================`))

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
      function employeesByMngr() {
        const query = "SELECT * FROM employee ORDER BY manager_id DESC";
        dbConnection.query(query, (err, res) => {
          if (err) throw err;
          tableLog(res);

            log(chalk.bgMagenta(`Here is a view of all the Employees by Manager!`))

            log(chalk.red(`=======================================================================================`))

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
      function addEmployee() {
        dbConnection.query("SELECT * FROM role", (err, roles) => {
          if (err) console.log(err);
          roles = roles.map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          });
        });
      }
      //-------------------------------------------------------------------------//
      function removeEmployee() {
        //BONUS

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
        //BONUS

        const query = "";
      }

      //-------------------------------------------------------------------------//
      function viewAllRoles() {
          const query = `SELECT role.id, role.title, role.salary, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;

        dbConnection.query(query, (err, res) => {
          if (err) throw err;
            tableLog(res);
            
            log(chalk.bgMagenta(`Here is a view of all the current roles!`))

            log(chalk.red(`=======================================================================================`))

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
        function addRole() {
            dbConnection.query('SELECT * FROM department', (err, departments) => {
                if (err) console.log(err);
                departments = departments.map((department) => {
                    return {
                        name: department.name,
                        value: department.id,
                    };
                });
                inquirer.prompt([
                        {
                            type: 'input',
                            name: 'newRole',
                            message: 'Enter the title of the new Role: '
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Enter the salary of the new role:',
                        },
                        {
                            type: 'list',
                            name: 'departmentId',
                            message: 'Enter the department of the new role:',
                            choices: departments,
                        },
                    ])
                    .then((data) => {
                        dbConnection.query(
                            'INSERT INTO role SET ?',
                            {
                                title: data.newRole,
                                salary: data.salary,
                                department_id: data.departmentId,
                            },
                            function (err) {
                                if (err) throw err;
                            }
                        );
                        log(chalk.bgGreen(`Successfully added the ${data.newRole} role!`));

                        log(chalk.red(`=======================================================================================`))

                        viewAllRoles();
                    });

            });
        }
      //-------------------------------------------------------------------------//
      function removeRole() {
        //BONUS
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function viewAllDepartments() {
        const query = "SELECT * FROM department";
        dbConnection.query(query, (err, res) => {
          if (err) throw err;
            tableLog(res);
            
            log(chalk.bgMagenta(`Here is a view of all the departments!`))

            log(chalk.red(`=======================================================================================`))

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
      function addDept() {
        inquirer.prompt([
            {
              name: "dept",
              type: "input",
              message: "Enter new department's name:",
            },
          ])
          .then(function (answer) {
            dbConnection.query("INSERT INTO department SET ?",
              {
                name: answer.dept,
              },
              function (err) {
                if (err) throw err;
                  log(chalk.bgGreen(`Department ${answer.dept} successfully added!`));

                  log(chalk.red(`=======================================================================================`))

                firstPrompt();
              }
            );
          });
      }
      //-------------------------------------------------------------------------//
      function removeDept() {
        //BONUS

        const query = "";
      }
      //-------------------------------------------------------------------------//

      function deptBudgets() {
        //BONUS
        const query = "";
      }
      //-------------------------------------------------------------------------//
      function quit() {
          log(chalk.bgYellow("Have a good day! "));
        process.exit();
      }
      //-------------------------------------------------------------------------//
    }); // end of .then function
} // end of first prompt function

// firstPrompt end
firstPrompt();
