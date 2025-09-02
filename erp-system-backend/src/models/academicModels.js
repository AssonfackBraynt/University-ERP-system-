const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const { User } = require('./authModels');

const Student = sequelize.define('Student', {
  student_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  full_name: { type: DataTypes.STRING(100), allowNull: false },
}, { timestamps: true });
Student.belongsTo(User, { foreignKey: 'user_id' });

const Program = sequelize.define('Program', {
  program_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  description: DataTypes.TEXT,
}, { timestamps: true });

const Course = sequelize.define('Course', {
  course_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  description: DataTypes.TEXT,
  program_id: DataTypes.INTEGER,
  instructor_id: DataTypes.INTEGER,
  fee: { type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 },
}, { timestamps: true });
Course.belongsTo(Program, { foreignKey: 'program_id' });
Course.belongsTo(User, { foreignKey: 'instructor_id', as: 'Instructor' });

const Enrollment = sequelize.define('Enrollment', {
  enrollment_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  course_id: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('enrolled', 'completed', 'dropped'), defaultValue: 'enrolled' },
}, { timestamps: true });
Enrollment.belongsTo(Student, { foreignKey: 'student_id' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

const Grade = sequelize.define('Grade', {
  grade_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  enrollment_id: { type: DataTypes.INTEGER, allowNull: false },
  grade: { type: DataTypes.DECIMAL(5,2), allowNull: false },
}, { timestamps: true });
Grade.belongsTo(Enrollment, { foreignKey: 'enrollment_id' });

const StudentAttendance = sequelize.define('StudentAttendance', {
  attendance_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  enrollment_id: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('present', 'absent', 'late'), allowNull: false },
}, { timestamps: true });
StudentAttendance.belongsTo(Enrollment, { foreignKey: 'enrollment_id' });

const Exam = sequelize.define('Exam', {
  exam_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  course_id: { type: DataTypes.INTEGER, allowNull: false },
  exam_date: { type: DataTypes.DATE, allowNull: false },
  type: { type: DataTypes.ENUM('midterm', 'final', 'quiz'), allowNull: false },
}, { timestamps: true });
Exam.belongsTo(Course, { foreignKey: 'course_id' });

const ExamResult = sequelize.define('ExamResult', {
  result_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  exam_id: { type: DataTypes.INTEGER, allowNull: false },
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  score: { type: DataTypes.DECIMAL(5,2), allowNull: false },
}, { timestamps: true });
ExamResult.belongsTo(Exam, { foreignKey: 'exam_id' });
ExamResult.belongsTo(Student, { foreignKey: 'student_id' });

module.exports = { Student, Program, Course, Enrollment, Grade, StudentAttendance, Exam, ExamResult };