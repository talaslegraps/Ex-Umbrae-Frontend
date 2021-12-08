import logo from "../media/logo_final.png";
import Navbar from "./Navbar";

const Header = ({ sidebar, onShowSidebar }) => {
  return (
    <div className="logo-header">
      <img src={logo} onClick={onShowSidebar} alt="logo" />
      <h2 className="header-text">Ex Umbrae</h2>
      <Navbar sidebar={sidebar} />
    </div>
  );
};

export default Header;
