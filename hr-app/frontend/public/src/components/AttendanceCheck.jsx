export default function AttendanceCheck() {
  const checkIn = () => alert("Check-in enregistré !");
  const checkOut = () => alert("Check-out enregistré !");

  return (
    <div>
      <h2>Pointage</h2>
      <button onClick={checkIn}>Check-in</button>
      <button onClick={checkOut}>Check-out</button>
    </div>
  );
}
