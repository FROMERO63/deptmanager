DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT,
    job_title VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    /* reference departments */
    dept_id INT NOT NULL FOREIGN_KEY

);

CREATE TABLE managers (
    manager_id INT NOT NULL AUTO_INCREMENT,
    manager_name VARCHAR(100) NOT NULL,
    /* reference departments */
    dept_id INT NOT NULL FOREIGN_KEY
);

CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL FOREIGN_KEY,
    /* reference other tables
    dept_id INT NOT NULL, departments
    salary INT NOT NULL, roles
    managers VARCHAR(100) NOT NULL, managers
    */
);



DELETE FROM departments
WHERE id = 2;

SELECT * FROM departments;
