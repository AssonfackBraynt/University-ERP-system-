class Attendance {
  constructor(id, employeeId, date, checkIn, checkOut) {
    this.id = id;
    this.employeeId = employeeId;
    this.date = date;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
  }
}

module.exports = Attendance;
