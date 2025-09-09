class LeaveRequest {
  constructor(id, employeeId, startDate, endDate, type, status = "pending") {
    this.id = id;
    this.employeeId = employeeId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.type = type;
    this.status = status;
  }
}
module.exports = LeaveRequest;
