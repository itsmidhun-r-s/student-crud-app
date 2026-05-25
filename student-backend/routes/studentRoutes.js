const express = require("express");
const router = express.Router();

const Student = require("../models/student");


// GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// ADD STUDENT
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);

    await newStudent.save();

    res.status(201).json({
      message: "Student Added Successfully",
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// UPDATE STUDENT
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});


// DELETE STUDENT
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;