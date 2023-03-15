DROP DATABASE IF EXISTS  employeeDb;
CREATE database employeeDb;

USE employeeDb;

-- CREATE A TABLE FOR DEPARTMENT -- 
CREATE TABLE department (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30) NOT NULL

);

-- CREATE A TABLE FOR ROLE  -- 
CREATE TABLE role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30) NOT NULL, 
salary DECIMAL (10,2) NOT NULL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id)

);
-- CREATE A TABLE FOR EMPLOYEE -- 

CREATE TABLE employee (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
FOREIGN KEY(role_id) REFERENCES role(id),

manager_id INT,
FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;