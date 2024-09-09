import React from "react";
import Logo from "../assets/Keep-logo.png";
import { LuMenu } from "react-icons/lu";
import { TbLayoutList } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

function Header() {
  return (
    <nav className="nav-bar container-fluid">
      <div className="nav-menu">
        <LuMenu style={{ fontSize: 23 }} />
      </div>
      <div className="nav-logo">
        <img src={Logo} alt="Logo"></img>
        <span>Keep</span>
      </div>
      <div className="nav-search">
        <IoIosSearch style={{ fontSize: 25, marginRight: 10 }} />
        <input
          className="search-input me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <div className="nav-option">
        <TbLayoutList style={{ fontSize: 25, marginLeft: 10 }} />
        <IoSettingsOutline style={{ fontSize: 25, marginLeft: 10 }} />
        <button>Dark Mode</button>
      </div>
    </nav>
  );
}

export default Header;
