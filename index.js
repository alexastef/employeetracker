// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const db = require("./db/db");
const { findAllEmployees } = require("./db/db");
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
          viewByManager();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "Update employee role":
          updateRole();
          break;
        case "Update employee manager":
          updateManager();
          break;
        case "Add department":
          addDepartment(); //need
          break;
        case "Add role":
          addRole(); //need
          break;
        case "Add department manager":
          addDeptManager();
          break; //need
        case "exit":
          break;
      }
    });
}

async function viewAll() {
    const employee = await db.findAllEmployees();
     console.log("\n");//skip a line
     console.table(employee);
     console.log("\n");
     start();
}

async function viewDepartments() {
    const departments = await db.findAllDepartments();
    console.log("\n");//skip a line
    console.table(departments);
    console.log("\n");
    start();
}

async function viewByDepartment() {
  const departments = await db.findAllDepartments();
  const departmentChoices = departments.map(({dept_name, id}) => ({
    name: dept_name,
    value: id
  }))

  const viewDept = await inquirer.prompt({
      name: "view_dept",
      type: "list",
      message: "Which department would you like to view?",
      choices: departmentChoices
  })
  
  const allByDepartments = await db.findAllEmployeesByDepartment(viewDept);
    
  console.log("\n");//skip a line
  console.table(allByDepartments);

  console.log("\n");
  start();
    
}

async function viewByManager() {
  const allByManagers = await db.findAllEmployeesByManager();

  console.log("\n");//skip a line
  console.table(allByManagers);
  console.log("\n");

  start();

}

async function viewManagers() {
  const managers = await db.findAllManagers();
  console.log('\n');
  console.table(managers);
  console.log("\n");

  start();
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
    
      console.log("\n");
      console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
      );
      console.log("\n");

      start();
}

async function removeEmployee() {
    const employees = await db.findAllEmployees();
    // shows all the employees. next need to prompt user Which employee would you like to remove?
    const employeeChoices = employees.map(({first_name, last_name}) => ({
        name: `${first_name} ${last_name}`
    }));
    employeeChoices.unshift({ name: "None", value: null });

    const rmvEmployee = await inquirer.prompt({
        type: "list",
        name: "remove",
        message: "Which employee would you like to remove?",
        choices: employeeChoices
    });

    await db.removeEmployee(rmvEmployee);

    console.log("\n");
    console.log(
      `Removed ${rmvEmployee.remove} from employee database`
      ); 
      console.log("\n");

    start();   
}

async function updateManager() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({id,first_name, last_name, manager}) => ({
        name: `${first_name} ${last_name}`, 
        manager: `${manager}`,
        value: id
    }));

    const managers = employees.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const employeeId = await inquirer.prompt({
            type: "list",
            name: "value",
            message: "Which employee's manager would you like to update?",
            choices: employeeChoices
    });

    const updateEmployee = employeeChoices.filter(employeeChoice => employeeChoice.value == employeeId.value);
    const employee = updateEmployee[0];

    const managerOptions = managers.filter(manager => manager.value != updateEmployee[0].value && manager.name != updateEmployee[0].manager);

    const newManager = await inquirer.prompt({
        type: "list",
        name: "value",
        message: "Who is the employee's new manager?",
        choices: managerOptions
    });

    const newManagerArray = managerOptions.filter(managerOption => managerOption.value == newManager.value);
    const newManagerOb = { name: newManagerArray[0].name, value: newManagerArray[0].value }

    await db.updateEmployeeManager(newManagerOb, employee);

    console.log("\n");
    console.log(
      `${employee.name}'s manager has been updated to ${newManagerOb.name}`
      );
    console.log("\n");

    start();
}

async function updateRole() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({id, first_name, last_name, title}) => ({
        name: `${first_name} ${last_name}, ${title}`,
        value: id
    }));

    let employee = await inquirer.prompt({
        type: "list",
        name: "id",
        message: "Which employee's role would you like to update?",
        choices: employeeChoices
    });

    let findEmployee = await db.findEmployee(employee);
    let updateEmployee = {
        id: findEmployee[0].id,
        first_name: findEmployee[0].first_name,
        last_name: findEmployee[0].last_name,
        role: findEmployee[0].role_id
    }

    const allRoles = await db.findAllRoles();
    const roles = allRoles.map(({id, title}) => ({
        name: title,
        value: id
    }));
    const roleChoices = roles.filter(role => role.value != updateEmployee.role);

    let newRole = await inquirer.prompt({
        type: "list",
        name: "id",
        message: "What is the employee's new role?",
        choices: roleChoices
    })

    await db.updateEmployeeRole(newRole, updateEmployee);

    console.log("\n");
    console.log(
      `${updateEmployee.first_name} ${updateEmployee.last_name}'s role has been updated`
      );
      console.log("\n");

    start();

  }

async function addDepartment() {
  const allDepartments = await db.findAllDepartments();
  const departments = allDepartments.map(({dept_name}) => (
    dept_name
  ));

  const newDepartment = await inquirer.prompt([
    {
        name: "dept_name",
        type: "input",
        message: "What is the department name?"
    }
  ]);
  
  if (departments.includes(newDepartment.dept_name)) {
    console.log(`${newDepartment.dept_name} already exists`);
    start();
  } else {
    await db.createDepartment(newDepartment);
  }

  console.log(
    `${newDepartment.dept_name} has been added to Departments`
    );
    console.log("\n");
  start();
}

async function addRole() {
  const allRoles = await db.findAllRoles();
  const roles = allRoles.map(({title}) => (
    title
  ));

  const newRole = await inquirer.prompt({
    name: "title",
    type: "input",
    message: "What is the role name?"
  });

  if (roles.includes(newRole.role_name)) {
    console.log(`${newRole.role_name} already exists`);
    start();
  } 
  
  const {roleSalary} = await inquirer.prompt({
      name: "roleSalary",
      type: "number",
      message: "What is the role salary?"
  });

  const departments = await db.findAllDepartments();
  const deptChoices = departments.map(({id, dept_name}) => ({
    name: dept_name,
    value: id
  }));

  const {deptId} = await inquirer.prompt({
    name: "deptId",
    type: "list",
    message: "What is the role department?",
    choices: deptChoices
  });

  newRole.salary = roleSalary;
  newRole.dept_id = deptId;

  await db.createRole(newRole);
  

  console.log(
    `${newRole.title} has been added to the database`
    );
  console.log("\n");

  start();

}

// DB isn't currently set up to do this, would like to build out this feature
async function addDeptManager() {
  const allDepartments = await db.findAllDepartments();
  const departments = allDepartments.map(({id, dept_name}) => ({
    name: dept_name,
    value: id
  }));

  const setDepartment = await inquirer.prompt({
    name: "view_dept",
    type: "list",
    message: "Which department would you like to add a Manager to?",
    choices: departments
  });

  let deptChoices = await db.findAllEmployeesByDepartment(setDepartment);
  const managerChoices = deptChoices.map(({Employee_ID, Employee, Title}) => ({
    name: `${Employee}, ${Title}`,
    value: Employee_ID
  }));

  const deptManager = await inquirer.prompt({
    name: "dept_manager",
    type: "list",
    message: "Which employee will be the department manager?",
    choices: managerChoices
  });

  console.log(deptManager);
}

