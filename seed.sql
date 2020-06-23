USE company_db;

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
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 25, NULL),
    ('Mike', 'Chan', 26, 1),
    ('Ashley', 'Rodriguez', 27, NULL),
    ('Kevin', 'Jones', 29, 15),
    ('Sarah', 'Scott', 30, 17);

SELECT * FROM employee;

-- Left join to view all by department
SELECT department.dept_name AS Department, role.title AS Title, 
CONCAT(employee.first_name, employee.last_name) AS Employee 
FROM employee
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department on role.department_id = department.id
ORDER BY Department;
