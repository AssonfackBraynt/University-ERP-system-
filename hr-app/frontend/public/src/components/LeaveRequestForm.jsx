import { useState } from "react";

export default function LeaveRequestForm() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Demande envoyée : du ${start} au ${end}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Demande de congé</h2>
      <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
      <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
      <button type="submit">Soumettre</button>
    </form>
  );
}
