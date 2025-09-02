const { Program, Course, Enrollment, Grade, StudentAttendance, Exam, ExamResult } = require('../models');
const Joi = require('joi');

const courseSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  program_id: Joi.number().integer(),
  instructor_id: Joi.number().integer(),
  fee: Joi.number(),
});

const createCourse = async (req, res) => {
  const { error } = courseSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error creating course', err });
  }
};

const studentDashboard = async (req, res) => {
  const studentId = req.user.studentId; // Assume linked via User to Student
  try {
    const enrollments = await Enrollment.findAll({ where: { student_id: studentId }, include: [Course, Grade, StudentAttendance] });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard', err });
  }
};

const generateTranscript = async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const grades = await Grade.findAll({ include: [{ model: Enrollment, where: { student_id: studentId }, include: [Course] }] });
    res.json(grades); // Frontend to render
  } catch (err) {
    res.status(500).json({ message: 'Error generating report', err });
  }
};

// Add CRUD for other entities (e.g., Program, Exam)

module.exports = { createCourse, studentDashboard, generateTranscript };