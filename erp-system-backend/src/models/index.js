const { User } = require('./authModels');
const { Student, Program, Course, Enrollment, Grade, StudentAttendance, Exam, ExamResult } = require('./academicModels');
const { Invoice, Payment, ExpenseType, Expense, MarketingCampaign } = require('./financeModels');
const { Employee, Payroll, LeaveRequest, Asset, EmployeeAttendance } = require('./hrModels');

module.exports = { User, Student, Employee, Program, Course, Enrollment, Grade, StudentAttendance, Exam, ExamResult, Invoice, Payment, ExpenseType, Expense, MarketingCampaign, Payroll, LeaveRequest, Asset, EmployeeAttendance };