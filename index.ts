#!/usr/bin/env node

import inquirer from "inquirer";

class Student {
  id: string;
  name: string;
  courses: string[];
  balance: number;
  constructor(id: string, name: string, courses: string[], balance: number) {
    this.id = id;
    this.name = name;
    this.courses = courses;
    this.balance = balance;
  }
}

let baseId = 10000;
let studentId: string = "";
let continueEnrollment = true;

let students: Student[] = [];

(async () => {
  do {
    let details = await inquirer.prompt({
      type: "list",
      name: "answer",
      message: "Please select an option:\n ",
      choices: ["Enroll a student", "Show student status"]
    });

    if (details.answer === "Enroll a student") {
      let studentName = await inquirer.prompt({
        type: "input",
        name: "ans",
        message: "Please enter the student name: ",
      });

      let trimmedStudentName = (studentName.ans).trim().toLowerCase();
      let studentNamesCheck = students.map((obj) => obj.name);

      if (studentNamesCheck.includes(trimmedStudentName) === false) {
        if (trimmedStudentName !== "") {
          baseId++;
          studentId = "StudentID" + baseId;

          console.log("\n\tYour account has been created");
          console.log(`Welcome, ${trimmedStudentName}!`);

          let course = await inquirer.prompt({
            type: "list",
            name: "ans",
            message: "Please select the course",
            choices: ["HTML", "CSS", "JS", "React", "Node"]
          });

          let courseFees = 0;
          switch (course.ans) {
            case "HTML":
              courseFees = 2000;
              break;

            case "CSS":
              courseFees = 3000;
              break;

            case "JS":
              courseFees = 4000;
              break;

            case "React":
              courseFees = 5000;
              break;

            case "Node":
              courseFees = 6000;
              break;
          }

          let courseSelected = await inquirer.prompt({
            type: "confirm",
            name: "ans",
            message: "Are you sure you want to enroll for this course",
          });

          if (courseSelected.ans === true) {
            let newStudent = new Student(
              studentId,
              trimmedStudentName,
              [course.ans],
              courseFees
            );

            students.push(newStudent);

            console.log("You have enrolled in this course");
          }
        } else {
          console.log("Invalid Name");
        }
      } else {
        console.log("This name is already exists");
      }
    } else if (details.answer === "Show student status") {
      if (students.length !== 0) {
        let studentNamescheck = students.map(e => e.name);

        let selectedStudent = await inquirer.prompt({
          type: "list",
          name: "studentName",
          message: "Select the student name",
          choices: studentNamescheck
        });

        let foundStudent = students.find(student => student.name === selectedStudent.studentName);

        console.log("Student Information");
        console.log("Student Name: " + foundStudent?.name);
        console.log("Student ID: " + foundStudent?.id);
        console.log("Student Courses: " + foundStudent?.courses.join(", "));
        console.log("Student Balance: " + foundStudent?.balance);
        console.log("\n");

      } else {
        console.log("No student is enrolled");
      }
    }

    let userConfirmation = await inquirer.prompt({
      type: "confirm",
      name: "ans",
      message: "Do you want to continue?",
    });

    if (userConfirmation.ans === false) {
      continueEnrollment = false;

    }
  } while (continueEnrollment);
})();