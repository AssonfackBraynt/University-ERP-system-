class Payroll {
  constructor(id, employeeId, paymentDate, amount, status) {
    this.id = id;
    this.employeeId = employeeId;
    this.paymentDate = paymentDate;
    this.amount = amount;
    this.status = status;
  }
}
module.exports = Payroll;
