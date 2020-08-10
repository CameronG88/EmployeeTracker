
DROP DATABASE IF EXISTS employee_db;


CREATE DATABASE employee_db

USE employee_db

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  deptName VARCHAR(30) NULL,
  PRIMARY KEY (id)
);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) NULL,
  deptId INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (deptId) REFERENCES department (id)
);


CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR (30) NOT NULL,
  roleId INT NOT NULL,
  mgrId INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (roleId) REFERENCES role (id),
  FOREIGN KEY (mgrId) REFERENCES employee (id)
);