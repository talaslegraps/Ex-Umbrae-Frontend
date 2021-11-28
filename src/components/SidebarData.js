import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";

const SidebarData = [
  {
    title: "Front Page",
    path: "/",
    icon: <GiIcons.GiAbstract024 />,
    className: "nav-text",
  },
  {
    title: "Album",
    path: "/collection",
    icon: <GiIcons.GiAbstract026 />,
    className: "nav-text",
  },
  {
    title: "Cards",
    path: "/collection/:id",
    icon: <GiIcons.GiAbstract032 />,
    className: "nav-text",
  },
];

export default SidebarData;
