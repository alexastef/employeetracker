const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    //series of query models
    // Find all employees
    findAllEmployees() {
        return this.connection.query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`
        )
    }
    
    //findAllManagers

    // Create new employee
    createEmployee(newEmployee) {
        let inserts = [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id];
        return this.connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, inserts
        )
    }

    //removeEmployee

    //updateEmployeeRole

    //updateEmployeeManager

    // Find all roles
    findAllRoles() {
        return this.connection.query(
            `SELECT role.id, role.title, department.dept_name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;`
        )
    }


    //createRole

    //removeRole

    findAllDepartments() {
        return this.connection.query(
            "SELECT * FROM department;"
        )
    }

    //createDepartment

    //removeDepartment

    findAllEmployeesByDepartment() {
        return this.connection.query(
            // "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role FROM employee LEFT JOIN department on employee."
            `SELECT department.dept_name AS Department, role.title AS Title, CONCAT(employee.first_name, employee.last_name) AS Employee 
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id 
            LEFT JOIN department on role.department_id = department.id
            ORDER BY Department;`

        )
    }

    //findAllEmployeesByManager

}

module.exports = new DB(connection);