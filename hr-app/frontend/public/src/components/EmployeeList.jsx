export default function EmployeeList() {
  const employees = [
    { id: 1, name: "Alice", position: "Développeuse" },
    { id: 2, name: "Bob", position: "Designer" }
  ];

  return (
    <div>
      <h2>Liste des employés</h2>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>{emp.name} - {emp.position}</li>
        ))}
      </ul>
    </div>
  );
}
