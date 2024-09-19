import React from "react";
import Logo from "../../assets/img/Keep-logo.png";
import { LuMenu } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsOutline, IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { TfiLayoutGrid2, TfiLayoutAccordionSeparated } from "react-icons/tfi";
import { toggleLayout, toggleTheme } from "../../store/keepSlice";
import { RiMoonClearLine } from "react-icons/ri";

function Header({ onMenuClick, getSearchValue }) {
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.fullLayout);
  const theme = useSelector((state) => state.theme);

  const handleChange = (e) => {
    getSearchValue(e.target.value);
  };
  return (
    <nav className={`nav-bar container-fluid ${theme && "dark-theme"}`}>
      <div className="nav-menu" onClick={onMenuClick}>
        <LuMenu style={{ fontSize: 23 }} />
      </div>
      <div className="nav-logo">
        <img draggable="false" height={40} width={40} src={Logo} alt="Logo"></img>
        <span>Keep</span>
      </div>
      <div className={`nav-search ${theme && "bg-secondary"}`}>
        <IoIosSearch
          style={{ fontSize: 25, marginRight: 10, marginLeft: 10 }}
        />
        <input
          className={`search-input ${theme && "text-bg-secondary"} me-2`}
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleChange}
        />
      </div>
      <div className="nav-option">
        <div onClick={() => dispatch(toggleLayout())}>
          {layout ? (
            <TfiLayoutAccordionSeparated
              style={{ fontSize: 22, marginLeft: 15 }}
            />
          ) : (
            <TfiLayoutGrid2 style={{ fontSize: 22, marginLeft: 15 }} />
          )}
        </div>
        <IoSettingsOutline style={{ fontSize: 23, marginLeft: 20 }} />
        <button onClick={() => dispatch(toggleTheme())}>
          {theme ? (
            <IoSunnyOutline style={{ fontSize: 25 }} />
          ) : (
            <RiMoonClearLine style={{ fontSize: 25 }} />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Header;
