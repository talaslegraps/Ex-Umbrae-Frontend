import logo from "../media/logo.png";

const Header = () => {
  return (
    <div className="logo-header">
      <img src={logo} />
      <h2 className="header-text">Le Card Game</h2>
    </div>
  );
};

export default Header;
