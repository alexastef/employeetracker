// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
//const viewBy = require("./view2");
const db = require("./db/db");
//const { addEmployee } = require("./view");
require("console.table");

start();


function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all managers",
        "View all departments",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "Add department manager",
        "Add department",
        "Add role",
        "Exit",
      ],
    })
    .then((answer) => {
      console.log(`You chose ${answer.action}`);
      switch (answer.action) {
        case "View all employees":
          viewAll()
          break;
        case "View all managers":
          viewManagers();
          break;
        case "View all departments":
          viewDepartments();
        case "View all employees by department":
          viewByDepartment();
          break;
        case "View all employees by manager":
          //viewBy.viewByMngr();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "Update employee role":
          //viewBy.updateRole();
          break;
        case "Update employee manager":
          //viewBy.updateManager();
          break;
        case "exit":
          break;
      }
    });
}

async function viewAll() {
    const employee = await db.findAllEmployees();
     console.log("\n");//skip a line
     console.table(employee);

     start();
}

async function viewDepartments() {
    const departments = await db.findAllDepartments();
    console.log("\n");//skip a line
    console.table(departments)

    start();
}

async function viewByDepartment() {
    // const allDepartments = await db.findAllDepartments();
    // console.log(allDepartments);

    // const departmentChoices = allDepartments.map(({id, dept_name}) => ({
    //     name: dept_name,
    //     value: id
    // }));

    // const {department} = await inquirer.prompt({
    //         name: "department",
    //         type: "list",
    //         message: "What department would you like to view?",
    //         choices: departmentChoices
    // });

    // console.log(department.department);

    const allByDepartments = await db.findAllEmployeesByDepartment();
    console.log("\n");//skip a line
    console.table(allByDepartments);

    start();
    
    // console.log(viewDepartment);

    // const viewDepartment = await inquirer.prompt([
    //     {
    //         name: "view_department",
    //         type: "list",
    //         message: "What department would you like to view?",
    //         choices: allDepartments
    //     }
    // ])

    // const viewByDept = await db.findAllEmployeesByDepartment(viewDepartment);
    // console.log("\n");
    // console.table(viewByDept);

}

async function viewManagers() {

}

async function addEmployee() {
    const role = await db.findAllRoles();
    const employees = await db.findAllEmployees();
    const employee = await  inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?",
        }
    ])
     
    const roleChoices = role.map(({id, title}) => ({
        name: title,
        value: id
    }));

    const {roleID} = await  inquirer.prompt({
        type: "list",
        name: "roleID",
        message: "What is the employee's role?",
        choices: roleChoices
    });

    employee.role_id = roleID;

    const managerChoices = employees.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });

    const { managerId } = await  inquirer.prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
      });
    
      employee.manager_id = managerId;
    
      await db.createEmployee(employee);
    
      console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
      );

      start();
}

// async function removeEmployee() {
//     const employees = await db.findAllEmployees();
    // shows all the employees. next need to prompt user Which employee would you like to remove?
    
// }

