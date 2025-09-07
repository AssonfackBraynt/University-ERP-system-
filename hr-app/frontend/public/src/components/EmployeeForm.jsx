export default function EmployeeForm() {
  return (
    <form>
      <h2>Ajouter un employé</h2>
      <input type="text" placeholder="Nom" />
      <input type="text" placeholder="Poste" />
      <input type="number" placeholder="Salaire" />
      <button type="submit">Enregistrer</button>
    </form>
  );
}
