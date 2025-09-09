const express = require("express");
const db = require("../db");
const router = express.Router();

// Soumettre une demande
router.post("/request", (req, res) => {
  const { employeeId, startDate, endDate, type } = req.body;
  const stmt = db.prepare("INSERT INTO leave_requests (employeeId, startDate, endDate, type) VALUES (?, ?, ?, ?)");
  stmt.run(employeeId, startDate, endDate, type);
  res.json({ message: "Demande de congé soumise" });
});

// Voir toutes les demandes
router.get("/", (req, res) => {
  const requests = db.prepare("SELECT * FROM leave_requests").all();
  res.json(requests);
});

// Approuver/Rejeter
router.put("/:id", (req, res) => {
  const { status } = req.body;
  db.prepare("UPDATE leave_requests SET status=? WHERE id=?").run(status, req.params.id);
  res.json({ message: `Demande ${status}` });
});

module.exports = router;
