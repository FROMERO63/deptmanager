const express = require('express');
const inquirer = require('inquirer');
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

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



//inqirer prompt
questions = [
  {
    type: 'list',
    message: 'What would you like to do? (Use arrow keys)',
    name: 'list',
    choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department']
  }
];

//function with select queries
function viewAllDepartments () {
  const query='SELECT * FROM departments';
  db.query(query, (err,res)=>{
      if (err){
        console.log("there was an error: " + err)
      };
      console.log(`Viewing all departments`);
      console.table(res);
      startPrompt();
    })
};

function viewAllRoles () {
  const query='SELECT roles.job_title, roles.role_id, departments.name, roles.salary FROM departments JOIN roles ON departments.id=roles.dept_id';
  db.query(query, (err,res)=>{
      if (err){
        console.log("there was an error: " + err)
      };
      console.log(`Viewing all roles`);
      console.table(res);
      startPrompt();
    })
};

function viewAllEmployees () {
  const query='SELECT employees.employee_id, employees.first_name, employees.last_name, roles.job_title, departments.name, roles.salary, employees.manager FROM departments JOIN roles ON departments.id=roles.dept_id JOIN employees ON roles.role_id=employees.role_id';
  db.query(query, (err,res)=>{
      if (err){
        console.log("there was an error: " + err)
      };
      console.log(`Viewing all employees`);
      console.table(res);
      startPrompt();
    })
};

// //add queries

function addADepartment () {
  inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please enter a new department"
  })
  .then((answer)=>{
    const query=`INSERT INTO departments (name) VALUES ("${answer.name}")`;
    db.query(query, (err,res)=>{
      if (err){
        console.log("there was an error: " + err)
      };
      console.log(`Added ${answer.name} to the database`);
      startPrompt();
    })
  })  
};

function addARole () {
  const query= "SELECT * FROM departments";
  db.query(query, (err,res)=>{
    if (err){
      console.log("there was an error: " + err)
    };
    inquirer.prompt([
      {type: "input",
      name: "jobtitle",
      message: "Please enter a new job title"
      },
      {type: "input",
      name: "salary",
      message: "Please enter salary"
      },
      {type: "list",
      name: "department",
      message: "Select department for new role",
      choices: res.map(
        (department)=>department.name
      ),
      },
  ])
  .then((answers)=>{
    const department= res.find(
      (department)=>department.name === answers.department
    );
    const query="INSERT INTO roles SET ?";
    db.query(query, {
        job_title: answers.jobtitle,
        salary: answers.salary,
        dept_id: department.id,
    },
    (err,res)=>{
      if (err){
        console.log("there was an error: " + err)
      };
      console.log(`Added ${answers.jobtitle} to the database`);
      startPrompt();
    });
  });  
});
};

function addAnEmployee () {
  db.query("SELECT role_id, job_title FROM roles", (err,res)=>{
    if (err){
      console.log("there was an error: " + err);
      return
    };
    inquirer.prompt([
      {type: "input",
      name: "firstname",
      message: "Please enter employee's first name"
      },
      {type: "input",
      name: "lastname",
      message: "Please enter employee's last name"
      },
      {type: "list",
      name: "roleid",
      message: "Select a role",
      choices: res.map(
        (roles)=>roles.job_title
      ),
      },
      {type: "input",
      name: "manager",
      message: "Please enter manager name"
      },
  ])
  .then((answers)=>{
    db.query("INSERT INTO employees SET ?", {
        first_name: answers.firstname,
        last_name: answers.lastname,
        role_id: answers.id,
        manager: answers.manager,
    },
    (err,res)=>{
      if (err){
        console.log("there was an error: " + err)
      };
      console.log(`Employee ${answers.firstname}  ${answers.lastname} added to the database`);
      startPrompt();
    });
  });  
});
};

function updateAnEmployee() {
  const getEmployees= "SELECT employees.employee_id, employees.first_name, employees.last_name FROM employees JOIN roles ON employees.role_id=roles.role_id";
  const getRoles= "SELECT * FROM roles";
  db.query(getEmployees, (err, resEmployees)=>{
    if (err)
    console.log(err);
    db.query(getRoles, (err,resRoles)=>{
      if (err)
      console.log(err);
      inquirer.prompt([
        {type: "list",
        name: "employee",
        message: "Please select which employee you would like to update",
        choices: resEmployees.map(
          (employee)=>`${employee.first_name} ${employee.last_name}`
        ),
        },
        {type: "list",
        name: "roles",
        message: "Choose a new role",
        choices: resRoles.map(
          (roles)=>roles.job_title),
        },
      ])
      .then((answers)=>{
        const employee = resEmployees.find(
          (employee) => `${employee.first_name} ${employee.last_name}` === answers.employee);
        const role = resRoles.find(
            (role) => role.job_title === answers.roles);
        const query ="UPDATE employees SET role_id = ? WHERE role_id = ?";
        //this is inserting a null value into role
                    db.query(query,[role.job_title, employee.role_id],
                      (err, res) => {
                        if (err) throw err;
                        console.log(
                            `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                        );
                        startPrompt();
                      }
                    );
    });
  });
  })
};

function startPrompt(){
inquirer.prompt(questions).then((answer) => {
  switch (answer.list){
    case "View All Departments":
      viewAllDepartments();
      break;
    case "View All Roles":
      viewAllRoles();
      break;
    case "View All Employees":
      viewAllEmployees();
      break;
    case "Add Department":
      addADepartment();
      break;
    case "Add Role":
      addARole();
      break;
    case "Add Employee":
      addAnEmployee();
      break;
    case "Update Employee Role":
      updateAnEmployee();
      break;
  }
})};

  startPrompt();