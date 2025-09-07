import LeaveRequestForm from "../components/LeaveRequestForm";
import AttendanceCheck from "../components/AttendanceCheck";
import PayrollReport from "../components/PayrollReport";

export default function EmployeeDashboard() {
  return (
    <div>
      <h1>Espace Employé</h1>
      <AttendanceCheck />
      <LeaveRequestForm />
      <PayrollReport />
    </div>
  );
}
