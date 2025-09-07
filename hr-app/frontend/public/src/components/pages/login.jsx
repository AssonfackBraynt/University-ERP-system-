import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === "employee") navigate("/employee");
    else navigate("/hr");
  };

  return (
    <div>
      <h1>Connexion</h1>
      <button onClick={() => handleLogin("employee")}>Employé</button>
      <button onClick={() => handleLogin("hr")}>RH</button>
    </div>
  );
}
