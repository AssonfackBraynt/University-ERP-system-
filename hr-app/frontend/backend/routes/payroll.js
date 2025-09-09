const express = require("express");
const db = require("../db");
const router = express.Router();

// Générer une paie
router.post("/", (req, res) => {
  const { employeeId, amount } = req.body;
  const paymentDate = new Date().toISOString().split("T")[0];
  db.prepare("INSERT INTO payroll (employeeId, paymentDate, amount, status) VALUES (?, ?, ?, ?)").run(employeeId, paymentDate, amount, "paid");
  res.json({ message: "Paie générée" });
});

// Voir toutes les paies
router.get("/", (req, res) => {
  const records = db.prepare("SELECT * FROM payroll").all();
  res.json(records);
});

module.exports = router;
