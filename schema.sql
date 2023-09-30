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
    dept_id INT NOT NULL

);

CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    dept_id INT NOT NULL,
    salaries INT NOT NULL,
    managers VARCHAR(100) NOT NULL,
);





DELETE FROM departments
WHERE id = 2;

SELECT * FROM departments;
