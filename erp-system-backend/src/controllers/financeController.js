const { Invoice, Payment, ExpenseType, Expense, MarketingCampaign } = require('../models');
const Joi = require('joi');
const Sequelize = require('sequelize');

const invoiceSchema = Joi.object({
  student_id: Joi.number().required(),
  amount: Joi.number().required(),
});

const createInvoice = async (req, res) => {
  const { error } = invoiceSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json({ ...invoice.dataValues, receipt: `Receipt_${invoice.invoice_id}` });
  } catch (err) {
    res.status(500).json({ message: 'Error creating invoice', err });
  }
};

const monthlyReport = async (req, res) => {
  const month = req.query.month;
  try {
    const payments = await Payment.findAll({ where: { payment_date: { [Sequelize.Op.like]: `${month}%` } } });
    const expenses = await Expense.findAll({ where: { date: { [Sequelize.Op.like]: `${month}%` } } });
    res.json({ payments, expenses }); // Aggregate in frontend
  } catch (err) {
    res.status(500).json({ message: 'Error fetching report', err });
  }
};

// Add CRUD for Payment, Expense, MarketingCampaign

module.exports = { createInvoice, monthlyReport };