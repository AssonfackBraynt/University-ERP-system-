import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Connexion</Link></li>
        <li><Link to="/employee">Espace Employé</Link></li>
        <li><Link to="/hr">Espace RH</Link></li>
      </ul>
    </nav>
  );
}
