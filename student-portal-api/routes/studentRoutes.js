const express = require("express");

const router = express.Router();

const students = require("../data/students");


// GET ALL STUDENTS

router.get("/", (req, res) => {
  res.status(200).json(students);
});


// GET STUDENT BY ID

router.get("/:id", (req, res) => {
  const studentId = parseInt(req.params.id);

  const student = students.find(
    s => s.id === studentId
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.status(200).json(student);
});


// ADD NEW STUDENT

router.post("/", (req, res) => {

  const { name, course } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    course
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

module.exports = router;