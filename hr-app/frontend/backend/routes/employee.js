const express = require("express");
const db = require("../db");
const router = express.Router();

// Liste employés
router.get("/", (req, res) => {
  const employees = db.prepare("SELECT * FROM employees").all();
  res.json(employees);
});

// Ajouter un employé
router.post("/", (req, res) => {
  const { name, position, hireDate, salary } = req.body;
  const stmt = db.prepare("INSERT INTO employees (name, position, hireDate, salary) VALUES (?, ?, ?, ?)");
  const result = stmt.run(name, position, hireDate, salary);
  res.json({ message: "Employé ajouté", id: result.lastInsertRowid });
});

module.exports = router;
