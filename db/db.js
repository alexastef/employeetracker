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
    findAllManagers() {
        return this.connection.query(
            `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee
            INNER JOIN employee manager on manager.id = employee.manager_id;`
        )
    }

    // Create new employee
    createEmployee(newEmployee) {
        let inserts = [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id];
        return this.connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, inserts
        )
    }

    //removeEmployee
    removeEmployee(rmvEmployee) {
        let inserts = [rmvEmployee.remove];
        return this.connection.query(
            `DELETE FROM employee WHERE ? = CONCAT(employee.first_name, ' ', employee.last_name);`, inserts
        )
    }

    //updateEmployeeRole
    updateEmployeeRole(newRole, employee) {
        let inserts = [newRole.id, employee.id];
        return this.connection.query(
            `UPDATE employee
            SET employee.role_id = ?
            WHERE employee.id = ?`, inserts
        )
    }

    updateEmployeeManager(newManagerOb, employee) {
        let inserts = [newManagerOb.value, employee.value];
        return this.connection.query(
            `UPDATE employee
             SET manager_id = ?
             WHERE id = ?;`, inserts
        )
    }

    // Find all roles
    findAllRoles() {
        return this.connection.query(
            `SELECT role.id, role.title, department.dept_name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;`
        )
    }

    createRole(newRole) {
        let inserts = [newRole.title, newRole.salary, newRole.dept_id];
        return this.connection.query(
            `INSERT INTO role (title, salary, department_id)
            VALUES (?,?,?)`, inserts
        )
    }

    removeRole(removeRole){
        let inserts = [removeRole.id];
        return this.connection.query(
            `DELETE FROM role
            WHERE id = ?`, inserts
        )
    }

    findAllDepartments() {
        return this.connection.query(
            "SELECT * FROM department;"
        )
    }

    createDepartment(newDepartment) {
        let inserts = [newDepartment.dept_name]
        return this.connection.query(
            `INSERT INTO department (dept_name)
            VALUES (?)`, inserts
        )
    }

    removeDepartment(removeDepartment){
        let inserts = [removeDepartment.id];
        return this.connection.query(
            `DELETE FROM department
            WHERE id = ?`, inserts
        )
    }

    findAllEmployeesByDepartment(viewDept) {
        let inserts = [viewDept.view_dept];
        return this.connection.query(
            `SELECT department.dept_name AS Department, department.id AS Department_ID, role.title AS Title, CONCAT(employee.first_name,' ', employee.last_name) AS Employee, employee.id AS Employee_ID, role.salary AS Salary
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            INNER JOIN department on role.department_id = department.id
            WHERE department.id = ?;`, inserts

        )
    }

    findEmployee(employee) {
        let inserts = [employee.id];
        return this.connection.query(
            `SELECT * FROM employee 
            WHERE employee.id = ?`, inserts
        )
    }

    //findAllEmployeesByManager
    findAllEmployeesByManager() {
        return this.connection.query(
            `SELECT  CONCAT(manager.first_name, ' ', manager.last_name) AS Manager, CONCAT(employee.first_name, ' ', employee.last_name) AS Employee  FROM employee
            LEFT JOIN employee manager on manager.id = employee.manager_id
            ORDER BY manager DESC;`
        )
    }



    setDepartmentManager(department) {
        let inserts = [department.dept_name];
        return this.connection.query(
            
        )
    }

}

module.exports = new DB(connection);