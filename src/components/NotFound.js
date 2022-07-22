import { Link } from "react-router-dom";

function NotFound() {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
  return (
    <div style={styles}>
      <h3>Nothing here!</h3>
      <Link to="/">Home</Link>
    </div>
  );
}

export default NotFound;