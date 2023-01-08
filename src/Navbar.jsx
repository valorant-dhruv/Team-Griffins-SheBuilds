import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Generate">Generate</Link>
        </li>
        <li>
          <Link to="/wills">Read </Link>
        </li>
        <li>
          <Link to="/lawyers">Lawyer Section</Link>
        </li>
      </ul>
    </nav>
  );
}
