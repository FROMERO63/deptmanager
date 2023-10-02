INSERT INTO departments (id, name)
VALUES
    (1, "Engineering"),
    (2, "Fincance"),
    (3, "Legal"),
    (4, "Sales");

INSERT INTO roles (job_title, salary, dept_id)
VALUES
    ("Software Engineer", 120000, 1),
    ("Aerospace Engineer", 150000, 1),
    ("Chemical Engineer", 200000, 1),
    ("Accountant", 110000, 2),
    ("Financial Analyst", 1500000, 2),
    ("Controller", 180000, 2),
    ("Lawyer", 180000, 3),
    ("Paralegal", 80000, 3),
    ("Law Clerk", 130000, 3),
    ("Lead Sales", 150000, 4),
    ("Sales Assistant", 70000, 4),
    ("Sales Manager", 130000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES
    ("Jack","Porter", 8 ,"John Johnson"),
    ("Monica","Rodriguez", 1 , "Martha Kim"),
    ("Paul","Park", 4, "Taylor White"),
    ("Whitney","Snow", 10, "Juan Morales");

