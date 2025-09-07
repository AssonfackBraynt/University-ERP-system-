import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

export default function HRDashboard() {
  return (
    <div>
      <h1>Espace RH</h1>
      <EmployeeForm />
      <EmployeeList />
    </div>
  );
}
