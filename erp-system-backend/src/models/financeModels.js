const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const { Student } = require('./academicModels');

const Invoice = sequelize.define('Invoice', {
  invoice_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  issue_date: { type: DataTypes.DATEONLY, allowNull: false },
  due_date: { type: DataTypes.DATEONLY, allowNull: false },
  description: DataTypes.TEXT,
  status: { type: DataTypes.ENUM('pending', 'paid', 'overdue'), defaultValue: 'pending' },
}, { timestamps: true });
Invoice.belongsTo(Student, { foreignKey: 'student_id' });

const Payment = sequelize.define('Payment', {
  payment_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  invoice_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  payment_date: { type: DataTypes.DATEONLY, allowNull: false },
  method: { type: DataTypes.ENUM('cash', 'card', 'transfer'), allowNull: false },
  receipt_number: DataTypes.STRING,
}, { timestamps: true });
Payment.belongsTo(Invoice, { foreignKey: 'invoice_id' });

const ExpenseType = sequelize.define('ExpenseType', {
  expense_type_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(50), unique: true, allowNull: false },
  description: DataTypes.TEXT,
}, { timestamps: true });

const Expense = sequelize.define('Expense', {
  expense_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  expense_type_id: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  description: DataTypes.TEXT,
}, { timestamps: true });
Expense.belongsTo(ExpenseType, { foreignKey: 'expense_type_id' });

const MarketingCampaign = sequelize.define('MarketingCampaign', {
  campaign_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  start_date: { type: DataTypes.DATEONLY, allowNull: false },
  end_date: DataTypes.DATEONLY,
  budget: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  leads: { type: DataTypes.INTEGER, defaultValue: 0 },
  conversions: { type: DataTypes.INTEGER, defaultValue: 0 },
  roi: { type: DataTypes.DECIMAL(5,2), defaultValue: 0.00 },
  description: DataTypes.TEXT,
}, { timestamps: true });

module.exports = { Invoice, Payment, ExpenseType, Expense, MarketingCampaign };