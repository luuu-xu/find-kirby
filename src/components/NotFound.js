import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="notfound-page">
      <h3 className="notfound-h3">Nothing here!</h3>
      <Link to="/" className="notfound-link">Home</Link>
    </div>
  );
}

export default NotFound;