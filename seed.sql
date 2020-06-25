USE company_db;

-- Add basic departments
INSERT INTO department (dept_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Marketing"), ("HR"), ("Administration"), ("Legal");

-- Add all basic roles
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 120000, 13), ("Salesperson", 70000, 13), ("Account Manager", 80000, 13), 
("Lead Engineer", 150000, 14), ("Software Engineer", 80000, 14),
("Marketing Manager", 80000, 15), ("Marketing Coordinator", 60000, 15), ("Graphic Designer", 60000, 15),
("Lead Counsel", 200000, 17),
("Accountant", 150000, 16),
("Administrator", 60000, 18),
("Pay Roll Coordinator", 70000, 19), ("Benefits Manager", 85000, 19);

SELECT * FROM role;

-- Add some employee data to start
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Smith', 1, NULL),
    ('Sam', 'Cunningham', 10, NULL),
    ('Ashley', 'Rodriguez', 2, 1),
    ('Kevin', 'Jones', 4, NULL),
    ('Sarah', 'Scott', 5, 4);

SELECT * FROM employee;

-- Left join to view all by department
SELECT department.dept_name AS Department, role.title AS Title, 
CONCAT(employee.first_name, employee.last_name) AS Employee 
FROM employee
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department on role.department_id = department.id
ORDER BY Department;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name AS department, role.salary, 
CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id 
LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;

INSERT INTO role (title, salary, department_id)
VALUES ("Creative Director", 85000, 15);

SELECT  CONCAT(manager.first_name, ' ', manager.last_name) AS manager, CONCAT(employee.first_name, employee.last_name) AS employee  FROM employee
LEFT JOIN employee manager on manager.id = employee.manager_id
ORDER BY manager DESC;

SELECT * FROM department;

SELECT department.dept_name AS Department, department.id AS Department_ID, role.title AS Title, CONCAT(employee.first_name,' ', employee.last_name) AS Employee, role.salary AS Salary
FROM employee
LEFT JOIN role ON employee.role_id = role.id
INNER JOIN department on role.department_id = department.id
WHERE department.id = 13;