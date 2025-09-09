const express = require("express");
const db = require("../db");
const router = express.Router();

// Check-in
router.post("/check-in", (req, res) => {
  const { employeeId } = req.body;
  const date = new Date().toISOString().split("T")[0];
  const checkIn = new Date().toISOString();
  db.prepare("INSERT INTO attendance (employeeId, date, checkIn) VALUES (?, ?, ?)").run(employeeId, date, checkIn);
  res.json({ message: "Check-in enregistré" });
});

// Check-out
router.post("/check-out", (req, res) => {
  const { employeeId } = req.body;
  const checkOut = new Date().toISOString();
  db.prepare("UPDATE attendance SET checkOut=? WHERE employeeId=? AND date=?").run(checkOut, employeeId, new Date().toISOString().split("T")[0]);
  res.json({ message: "Check-out enregistré" });
});

// Liste présences
router.get("/", (req, res) => {
  const records = db.prepare("SELECT * FROM attendance").all();
  res.json(records);
});

module.exports = router;
