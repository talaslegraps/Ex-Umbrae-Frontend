import logo from "../media/logo_final.png";

const Header = ({ onShowSidebar }) => {
  return (
    <div className="logo-header">
      <img src={logo} onClick={onShowSidebar} alt="logo" />
      <h2 className="header-text">Ex Umbrae</h2>
    </div>
  );
};

export default Header;
