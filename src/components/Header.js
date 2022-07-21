import '../styles/Header.css';
import Logo from '../resources/images/logo.png';

function Header() {
  return (
    <header className="header">
      <HeaderLogo logo={Logo} />
      <HeaderTitle />
    </header>
  );
}

function HeaderLogo({ logo }) {
  return (
      <img src={logo} alt="A cute Kirby" className="header-logo" />
  );
}

function HeaderTitle() {
  return (
    <h1 className="header-title">
      Find Kirby!
    </h1>
  );
}

export default Header;