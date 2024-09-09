import React from "react";
import notesIcon from "../assets/svg/notes.svg";
import reminderIcon from "../assets/svg/reminder.svg";
import labelsIcon from "../assets/svg/labelsIcon.svg";
import ArchiveIcon from "../assets/svg/archive.svg";
import TrashIcon from "../assets/svg/trash.svg";

function SideMenu() {
  return (
    <aside className="side-menu">
      <div className="side-menu-links">
        <li className="side-menu-link">
          <img src={notesIcon} alt="notes"></img>
          <span>Notes</span>
        </li>
        <li className="side-menu-link">
          <img src={reminderIcon} alt="reminder"></img>
          <span>Reminder</span>
        </li>
        <li className="side-menu-link">
          <img src={labelsIcon} alt="labels"></img>
          <span>Labels</span>
        </li>
        <li className="side-menu-link">
          <img src={ArchiveIcon} alt="archive"></img>
          <span>Archive</span>
        </li>
        <li className="side-menu-link">
          <img src={TrashIcon} alt="trash"></img>
          <span>Trash</span>
        </li>
      </div>
    </aside>
  );
}

export default SideMenu;
