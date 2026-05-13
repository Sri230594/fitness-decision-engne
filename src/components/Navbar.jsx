import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth).then(() => {
      navigate("/login");
    });
  }

  return (
    <nav className="navbar">
      <Link className="navbar-logo" to="/dashboard">
        Fitness Engine
      </Link>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/questionnaire">Questionnaire</Link>
        <Link to="/routine">Routine</Link>
        <button className="navbar-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
