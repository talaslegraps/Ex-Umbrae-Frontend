import React from "react";
import { Link } from "react-router-dom";
import SidebarData from "./SidebarData";
import "../styles/components/Navbar.css";

function Navbar({ sidebar, onShowSidebar }) {
  return (
    <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
      <ul className="nav-menu-items">
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.className}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
