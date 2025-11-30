import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Fire Arm Database</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Report Mistake
        </Link>
        <Link to="/addrecipe" className="nav-link">
          Make Request
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
