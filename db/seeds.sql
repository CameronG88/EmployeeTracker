USE employee_db

INSERT INTO department (id, deptName)
VALUES (1, "Admininistration"),
       (2,"Marketing"),
       (3,"Sales"),
       (4,"IT");

INSERT INTO role (id, title, salary, deptId)
VALUES (1, "CEO", 350000, 1),
       (2, "Customer Servie Rep", 50000, 2),
       (3, "Salesperson", 100000, 3),
       (4, "IT Engineer", 85000, 4);



INSERT INTO employee (id, firstName, lastName, roleId)
VALUES (1, "Kwaunz", "Smith", 1),
       (2, "Jacky", "Macky", 2),
       (3, "Bryan", "Rabbit", 3),
       (4, "SweetHands", "McGee", 4);