const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./routes/employee");
const leaveRoutes = require("./routes/leave");
const attendanceRoutes = require("./routes/attendance");
const payrollRoutes = require("./routes/payroll");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/employees", employeeRoutes);
app.use("/leave", leaveRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/payroll", payrollRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`));
