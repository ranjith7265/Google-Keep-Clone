import React from "react";
import { NavLink } from "react-router-dom";
import notesIcon from "../assets/svg/notes.svg";
import reminderIcon from "../assets/svg/reminder.svg";
import labelsIcon from "../assets/svg/labelsIcon.svg";
import ArchiveIcon from "../assets/svg/archive.svg";
import TrashIcon from "../assets/svg/trash.svg";
import { useSelector } from "react-redux";

function SideMenu({ showMenu }) {
  const theme = useSelector((state) => state.theme);
  return (
    <aside className={`side-menu ${showMenu ? "" : "menu-hide"} ${theme && "dark-theme"}`}>
      <div className="side-menu-links">
        <NavLink
          className={`${theme ? "link-light" : "link-dark"}`}
          to="/notes"
        >
          <li className="side-menu-link">
            <img src={notesIcon} alt="notes"></img>
            <span>Notes</span>
          </li>
        </NavLink>
        <NavLink
          className={`${theme ? "link-light" : "link-dark"}`}
          to="/reminder"
        >
          <li className="side-menu-link">
            <img src={reminderIcon} alt="reminder"></img>
            <span>Reminder</span>
          </li>
        </NavLink>
        <NavLink
          className={`${theme ? "link-light" : "link-dark"}`}
          to="/labels"
        >
          <li className="side-menu-link">
            <img src={labelsIcon} alt="labels"></img>
            <span>Labels</span>
          </li>
        </NavLink>
        <NavLink
          className={`${theme ? "link-light" : "link-dark"}`}
          to="/archive"
        >
          <li className="side-menu-link">
            <img src={ArchiveIcon} alt="archive"></img>
            <span>Archive</span>
          </li>
        </NavLink>
        <NavLink
          className={`${theme ? "link-light" : "link-dark"}`}
          to="/trash"
        >
          <li className="side-menu-link">
            <img src={TrashIcon} alt="trash"></img>
            <span>Trash</span>
          </li>
        </NavLink>
      </div>
    </aside>
  );
}

export default SideMenu;
