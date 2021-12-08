import React from "react";
import * as GiIcons from "react-icons/gi";

const SidebarData = [
  {
    title: "Front Page",
    path: "/",
    icon: <GiIcons.GiAbstract005 />,
    className: "nav-text",
  },
  {
    title: "Album",
    path: "/collection",
    icon: <GiIcons.GiAbstract026 />,
    className: "nav-text",
  },
  {
    title: "Summon",
    path: "/mint",
    icon: <GiIcons.GiAbstract016 />,
    className: "nav-text",
  },
  {
    title: "Info",
    path: "/info",
    icon: <GiIcons.GiAbstract038 />,
    className: "nav-text",
  },
];

export default SidebarData;
