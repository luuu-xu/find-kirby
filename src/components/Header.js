import '../styles/Header.css';
import Logo from '../resources/images/logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <header className="header">
      <HeaderLogo logo={Logo} handleClick={handleClick} />
      <HeaderTitle handleClick={handleClick} />
    </header>
  );
}

function HeaderLogo({ logo, handleClick }) {
  return (
      <img 
        src={logo}
        alt="A cute Kirby"
        className="header-logo"
        onClick={handleClick}
      />
  );
}

function HeaderTitle({ handleClick }) {
  return (
    <h1 className="header-title" onClick={handleClick}>
      Find Kirby!
    </h1>
  );
}

export default Header;