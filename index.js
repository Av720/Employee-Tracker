// create the dependencies
const mySql = require("mysql2");
const inquirer = require("inquirer")
const consoleTable = require("console.table");
const figlet = require("figlet");
const log = console.log;

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

dbConnection.connect(function(err) {
    if (err) throw err;
    
    //log the connection using thread id 
    log(`Successfully connected as id ${dbConnection.threadId}!`);
    
    // this will start the figlet fucntion
    // firstPrompt();
})

// firstPrompt function - this will prompt the user with the choices to execute
function firstPrompt() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by Manager',
                'Add employee',
                'Remove employee',
                'Update employee role',
                'Update employee manager',
                'View all roles',
                'Add role',
                'Remove role',
                'View all departments',
                'Add a department',
                'Remove department',
                'View department budgets',
                'Quit'],
        }

    ])
    .then((answers) => {
        const { choices } = answers;
        log(choices)
    })
    
    
    




    
} // firstPrompt end
firstPrompt();
