CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
    
CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),  
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_department FOREIGN KEY (department_id)
		REFERENCES department(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    CONSTRAINT fk_role FOREIGN KEY (role_id)
		REFERENCES role(id)
        ON UPDATE CASCADE,
	CONSTRAINT fk_manager FOREIGN KEY (manager_id)
		REFERENCES employee(id)
);

SELECT * from department;
select * from role;
select * from employee;
