import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import notesIcon from "../../assets/svg/notes.svg";
import reminderIcon from "../../assets/svg/reminder.svg";
import labelsIcon from "../../assets/svg/labelsIcon.svg";
import ArchiveIcon from "../../assets/svg/archive.svg";
import TrashIcon from "../../assets/svg/trash.svg";
import { MdDelete } from "react-icons/md";
import { deleteLabel } from "../../store/keepSlice";

function SideMenu({ showMenu }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const labels = useSelector((state) => state.labels);
  return (
    <aside
      className={`side-menu ${showMenu ? "" : "menu-hide"} ${
        theme && "dark-theme"
      }`}
    >
      <div className="side-menu-links">
        <NavLink
          className={`${theme ? "link-light" : "link-dark"}`}
          to="/"
          draggable="false"
        >
          <div className="side-menu-link">
            <img src={notesIcon} alt="notes-icon"></img>
            <span>Notes</span>
          </div>
        </NavLink>
        <NavLink
          className={`${theme ? "link-light" : "link-dark"}`}
          to="/reminder"
          draggable="false"
        >
          <div className="side-menu-link">
            <img src={reminderIcon} alt="reminder-icon"></img>
            <span>Reminder</span>
          </div>
        </NavLink>

        <NavLink
          className={`${theme ? "link-light" : "link-dark"}`}
          to="/labels"
          draggable="false"
        >
          <div className="side-menu-link">
            <img src={labelsIcon} alt="labels-icon"></img>
            <span>Labels</span>
          </div>
        </NavLink>
        {labels.length > 0 &&
          labels.map((label) => (
            <NavLink
              key={label}
              className={`${theme ? "link-light" : "link-dark"}`}
              to={`/labels/${label.toLowerCase()}`}
              draggable="false"
            >
              <div className="side-menu-link">
                <button
                  className="label-delete"
                  onClick={() => dispatch(deleteLabel(label))}
                >
                  <MdDelete />
                </button>
                <span>{label}</span>
              </div>
            </NavLink>
          ))}
        <NavLink
          className={`${theme ? "link-light" : "link-dark"}`}
          to="/archive"
          draggable="false"
        >
          <div className="side-menu-link">
            <img src={ArchiveIcon} alt="archive-icon"></img>
            <span>Archive</span>
          </div>
        </NavLink>
        <NavLink
          className={`${theme ? "link-light" : "link-dark"}`}
          to="/trash"
          draggable="false"
        >
          <div className="side-menu-link">
            <img src={TrashIcon} alt="trash-icon"></img>
            <span>Trash</span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
}

export default SideMenu;
