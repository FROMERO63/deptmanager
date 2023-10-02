const express = require('express');
const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'FRomero631#',
    database: 'business_db'
  },
  console.log(`Connected to the business_db database.`)
);

//inqirer prompt
quetions = [
  {
    type: 'list',
    message: 'What would you like to do? (Use arrow keys)',
    name: 'list',
    choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department']
  }
];

//variables with select queries
const selectDepts= db.query('SELECT * FROM departments', function(err,results){
  console.log(results);
});

const selectRoles= db.query('SELECT roles.job_title, roles.role_id, departments.name, roles.salary FROM departments JOIN roles ON departments.id=roles.dept_id', function(err,results){
  console.log(results);
});

const selectEmployees= db.query(
  'SELECT employees.employee_id, employees.first_name, employees.last_name, roles.job_title, departments.name, roles.salary, employees.manager FROM departments JOIN roles ON departments.id=roles.dept_id JOIN employees ON roles.role_id=employees.role_id', function(err,results){
  console.log(results);
});

//add queries

const addDept = db.query(`INSERT INTO departments (name) VALUES ("${responses["deptname"]}")`, function(err,results){
  console.log(results);
});

const addARole = db.query(`INSERT INTO roles (job_title, salary, dept_id) VALUES ("${responses["jobtitle"]}",${responses["salary"]},${responses["deptid"]})`, function(err,results){
  console.log(results);
});

const addAnEmployee = db.query(`INSERT INTO employees (first_name, last_name, role_id, manager) VALUES ("${responses["firstname"]}","${responses["lastname"]}",${responses["roleid"]},"${responses["manager"]}")`, function(err,results){
  console.log(results);
});

//edit query
const editAnEmployee = db.query(`UPDATE employees SET role_id="${responses["updateroleid"]}" WHERE employee_id="${responses["selectemployeeid"]}"`, function(err,results){
  console.log(results);
});

//varaibles to functions
function viewAllEmployees(){
  selectEmployees;
};

function updateEmployeeRole(){
  editAnEmployee;
};

function viewAllRoles(){
  selectRoles;
};

function addRole(){
  addARole;
};

function viewAllDepartments(){
  selectDepts;
};

function addDepartment(){
  addDept;
};

function addEmployee(){
  addAnEmployee;
};

function startPrompt(){
  inquirer.prompt(questions.list).then((responses) => {
  let listResponse = responses["list"];
  console.log(listResponse);
  if( listResponse === "View All Employees"){
    viewAllEmployees;
  }
  else if( listResponse === "Update Employee Role"){
    updateEmployeeRole;
  }
  else if( listResponse === "View All Roles"){
    viewAllRoles;
  }
  else if( listResponse === "Add Role"){
    addRole;
  }
  else if( listResponse === "View All Departments"){
    viewAllDepartments;
  }
  else if( listResponse === "Add Department"){
    addDepartment;
  }
  else if( listResponse === "Add Employee"){
    addEmployee;
  }
  else (console.log('error in choice'));
  }
)};

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});