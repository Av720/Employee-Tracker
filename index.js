// create the dependencies
const mySql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const figlet = require("figlet");
const log = console.log;
const tableLog = console.table;
const chalk = require("chalk");

// Connect to the database using dbnode
const dbConnection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employeeDb",
});

dbConnection.connect((err) => {
  if (err) throw err;
});
//log the connection using thread id

//figlet using textSync
log(
  chalk.greenBright.bold(
    "======================================================================================================="
  )
);
log(``);
log(chalk.redBright.bold(figlet.textSync("EMPLOYEE TRACKER")));
log(``);
log(
  chalk.greenBright.bold(
    `======================================================================================================`
  )
);

// firstPrompt function - this will prompt the user with the choices to execute
const firstPrompt = () => {
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
          "Add Employee",
          "Update employee role",
          "View all roles",
          "Add role",
          "View all departments",
          "Add a department",
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
        case "Add Employee":
          addEmployee();
          break;

        // "Update employee role", user input
        case "Update employee role":
          updateEmploRole();
          break;

        // "View all roles", user input
        case "View all roles":
          viewAllRoles();
          break;
        
        case "Add role":
          addRole();
          break;

        //"View all Departments", user input
        case "View all departments":
          viewAllDepartments();
          break;

        //"Add a department", user input
        case "Add a department":
          addDept();
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
          log(chalk.bgRed(`Here is a full list of all the Employees!`));

          log(
            chalk.red(
              `=======================================================================================`
            )
          );

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

          log(
            chalk.bgRed(`Here is a view of all the Employees by Department!`)
          );

          log(
            chalk.red(
              `=======================================================================================`
            )
          );

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
      function employeesByMngr() {
        const query = "SELECT * FROM employee ORDER BY manager_id DESC";
        dbConnection.query(query, (err, res) => {
          if (err) throw err;
          tableLog(res);

          log(chalk.bgRed(`Here is a view of all the Employees by Manager!`));

          log(
            chalk.red(
              `=======================================================================================`
            )
          );

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
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "Enter first name of new employee:",
              },
              {
                type: "input",
                name: "lastName",
                message: "Enter last name of new employee:",
              },
              {
                type: "list",
                name: "role",
                message: "Enter the new role of the employee:",
                choices: roles,
              },
              {
                type: "list",
                name: "managerId",
                message: "Assign a new Manager to the new employee:",
                choices: [1, 5, 8],
              },
            ])
            .then((data) => {
              console.log(data.role);
              dbConnection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: data.firstName,
                  last_name: data.lastName,
                  role_id: data.role,
                  manager_id: data.managerId,
                },
                (err) => {
                  if (err) throw err;

                  log(
                    chalk.bgGreen(
                      `Successfully added ${data.firstName} to the Employee Roster `
                    )
                  );

                  viewAllEmployees();
                }
              );
            });
        });
      }
      //-------------------------------------------------------------------------//

      function updateEmploRole() {
        console.log("You have selected update employee role");
        dbConnection.query(
          'SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee',
          (err, data) => {
            dbConnection.query(
              "SELECT id AS value, title AS name FROM role",
              (err, roleData) => {
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "employee_id",
                      message: "Which eployee's role would you like to update?",
                      choices: data,
                    },
                    {
                      type: "list",
                      name: "role_id",
                      message:
                        "Which role do you want to assign the selected employee?",
                      choices: roleData,
                    },
                  ])
                  .then((data) => {
                    let id = data.employee_id;
                    let role_id = data.role_id;
                    dbConnection.query(
                      "UPDATE employee SET role_id = ? WHERE id = ?",
                      [role_id, id],
                      (err, data) => {
                        log(
                          chalk.red(
                            `=======================================================================================`
                          )
                        );
                        err
                          ? console.log(err)
                          : log(
                              chalk.bgGreen(
                                "Succesfully updated the new employee role!"
                              )
                            );

                        log(
                          chalk.red(
                            `=======================================================================================`
                          )
                        );
                        viewAllEmployees();
                      }
                    );
                  });
              }
            );
          }
        );
      }

      //-------------------------------------------------------------------------//
      
      function viewAllRoles() {
        const query = `SELECT role.id, role.title, role.salary, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;

        dbConnection.query(query, (err, res) => {
          if (err) throw err;
          tableLog(res);

          log(chalk.bgRed(`Here is a view of all the current roles!`));

          log(
            chalk.red(
              `=======================================================================================`
            )
          );

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
      function addRole() {
        dbConnection.query("SELECT * FROM department", (err, departments) => {
          if (err) console.log(err);
          departments = departments.map((department) => {
            return {
              name: department.name,
              value: department.id,
            };
          });
          inquirer
            .prompt([
              {
                type: "input",
                name: "newRole",
                message: "Enter the title of the new Role: ",
              },
              {
                type: "input",
                name: "salary",
                message: "Enter the salary of the new role:",
              },
              {
                type: "list",
                name: "departmentId",
                message: "Enter the department of the new role:",
                choices: departments,
              },
            ])
            .then((data) => {
              dbConnection.query(
                "INSERT INTO role SET ?",
                {
                  title: data.newRole,
                  salary: data.salary,
                  department_id: data.departmentId,
                },
                function (err) {
                  if (err) throw err;
                }
              );
              log(
                chalk.bgGreen(`Successfully added the ${data.newRole} role!`)
              );

              log(
                chalk.red(
                  `=======================================================================================`
                )
              );

              viewAllRoles();
            });
        });
      }
      //-------------------------------------------------------------------------//

      function viewAllDepartments() {
        const query = "SELECT * FROM department";
        dbConnection.query(query, (err, res) => {
          if (err) throw err;
          tableLog(res);

          log(chalk.bgRed(`Here is a view of all the departments!`));

          log(
            chalk.red(
              `=======================================================================================`
            )
          );

          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
      function addDept() {
        inquirer
          .prompt([
            {
              name: "dept",
              type: "input",
              message: "Enter new department's name:",
            },
          ])
          .then(function (answer) {
            dbConnection.query(
              "INSERT INTO department SET ?",
              {
                name: answer.dept,
              },
              function (err) {
                if (err) throw err;
                log(
                  chalk.bgGreen(`Department ${answer.dept} successfully added!`)
                );

                log(
                  chalk.red(
                    `=======================================================================================`
                  )
                );

                firstPrompt();
              }
            );
          });
      }
      //
      //-------------------------------------------------------------------------//

      function deptBudgets() {
        const sql = `SELECT department_id AS id, 
                      department.name AS department,
                      SUM(salary) AS budget
               FROM  role  
               JOIN department ON role.department_id = department.id GROUP BY  department_id`;

        dbConnection.query(sql, (err, rows) => {
          if (err) throw err;
          console.table(rows);

          log(chalk.bgRed(`Here is a view of all the Department Budgets! `));
          log(
            chalk.red(
              `=======================================================================================`
            )
          );
          firstPrompt();
        });
      }
      //-------------------------------------------------------------------------//
      function quit() {
        log(chalk.bgYellow("Have a good day! "));
        process.exit();
      }
      //-------------------------------------------------------------------------//
    }); // end of .then function
}; // end of first prompt function

// firstPrompt end
firstPrompt();
