const { Employee, Payroll, LeaveRequest, Asset, EmployeeAttendance } = require('../models');
const Joi = require('joi');

const employeeSchema = Joi.object({
  user_id: Joi.number().required(),
  full_name: Joi.string().required(),
  position: Joi.string().required(),
});

const approveLeave = async (req, res) => {
  const { request_id } = req.params;
  try {
    const [updated] = await LeaveRequest.update({ status: 'approved' }, { where: { request_id } });
    if (updated) {
      console.log(`Notification: Leave request ${request_id} approved`);
      res.json({ message: 'Leave approved' });
    } else {
      res.status(404).json({ message: 'Leave request not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error approving leave', err });
  }
};

const hrDashboard = async (req, res) => {
  try {
    const leaves = await LeaveRequest.findAll({ where: { status: 'pending' } });
    const payrolls = await Payroll.findAll({ where: { status: 'pending' } });
    res.json({ leaves, payrolls });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboard', err });
  }
};

// Add CRUD for Employee, Payroll, Asset, Attendance

module.exports = { approveLeave, hrDashboard };