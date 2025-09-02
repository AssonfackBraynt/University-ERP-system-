const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const { User } = require('./authModels');

const Employee = sequelize.define('Employee', {
  employee_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  full_name: { type: DataTypes.STRING(100), allowNull: false },
  position: { type: DataTypes.STRING(50), allowNull: false },
}, { timestamps: true });
Employee.belongsTo(User, { foreignKey: 'user_id' });

const Payroll = sequelize.define('Payroll', {
  payroll_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employee_id: { type: DataTypes.INTEGER, allowNull: false },
  gross_salary: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  net_salary: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'paid'), defaultValue: 'pending' },
}, { timestamps: true });
Payroll.belongsTo(Employee, { foreignKey: 'employee_id' });

const LeaveRequest = sequelize.define('LeaveRequest', {
  request_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employee_id: { type: DataTypes.INTEGER, allowNull: false },
  start_date: { type: DataTypes.DATEONLY, allowNull: false },
  end_date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' },
}, { timestamps: true });
LeaveRequest.belongsTo(Employee, { foreignKey: 'employee_id' });

const Asset = sequelize.define('Asset', {
  asset_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  status: { type: DataTypes.ENUM('available', 'assigned', 'damaged'), defaultValue: 'available' },
}, { timestamps: true });

const EmployeeAttendance = sequelize.define('EmployeeAttendance', {
  attendance_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employee_id: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('present', 'absent', 'late'), defaultValue: 'absent' },
}, { timestamps: true });
EmployeeAttendance.belongsTo(Employee, { foreignKey: 'employee_id' });

module.exports = { Employee, Payroll, LeaveRequest, Asset, EmployeeAttendance };