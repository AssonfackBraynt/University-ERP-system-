import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Appel du backend
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Erreur backend :", err));
  }, []);

  return (
    <div>
      <h1>Frontend React ✅</h1>
      <p>Message du backend : {message}</p>
    </div>
  );
}

export default App;
