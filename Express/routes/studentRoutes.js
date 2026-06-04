const express = require("express");
const fs = require("fs");

const router = express.Router();

const filePath = "./data/students.json";


// GET ALL STUDENTS
router.get("/", (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  res.json(students);
});


// GET STUDENT BY ID
router.get("/:id", (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  const student = students.find(
    s => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.json(student);
});


// ADD NEW STUDENT
router.post("/", (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  const newStudent = {
    id: Date.now(),
    name: req.body.name
  };

  students.push(newStudent);

  fs.writeFileSync(
    filePath,
    JSON.stringify(students, null, 2)
  );

  res.status(201).json(newStudent);
});


// UPDATE STUDENT
router.put("/:id", (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  const index = students.findIndex(
    s => s.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  students[index].name = req.body.name;

  fs.writeFileSync(
    filePath,
    JSON.stringify(students, null, 2)
  );

  res.json(students[index]);
});


// DELETE STUDENT
router.delete("/:id", (req, res) => {
  const students = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  const filteredStudents = students.filter(
    s => s.id !== Number(req.params.id)
  );

  fs.writeFileSync(
    filePath,
    JSON.stringify(filteredStudents, null, 2)
  );

  res.json({
    message: "Student deleted successfully"
  });
});

module.exports = router;