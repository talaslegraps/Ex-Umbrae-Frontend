import logo from "../media/logo.png";

const Header = ({ onShowSidebar }) => {
  return (
    <div className="logo-header">
      <img src={logo} onClick={onShowSidebar} alt="logo" />
      <h2 className="header-text">Le Card Game</h2>
    </div>
  );
};

export default Header;
