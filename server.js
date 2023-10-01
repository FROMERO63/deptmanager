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
    choices: ['View All Employees','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department']
  }
];

function viewAllEmployees(){

};

function updateEmployeeRole(){
  
};

function viewAllRoles(){
  
};

function addRole(){
  
};

function viewAllDepartments(){
  
};

function addDepartment(){
  
};

function startPrompt(){
  inquirer.prompt(quetions).then((responses) => {
  let listResponse = response["list"];
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
  else (console.log('error in choice'));
  }
)}

// Query database
db.query('SELECT * FROM departments', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});