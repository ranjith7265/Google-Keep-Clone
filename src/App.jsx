import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Notes from "./components/Notes";
import Reminder from "./components/Reminder";
import Archive from "./components/Archive";
import Trash from "./components/Trash";
import Labels from "./components/Labels";
import { useSelector } from "react-redux";
import NewLabel from "./components/newLabel";

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const theme = useSelector((state) => state.theme);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const getSearchValue = (value) => {
    setSearchValue(value);
  };
  return (
    <Router>
      <Header onMenuClick={handleMenuClick} getSearchValue={getSearchValue} />
      <div className={`hero-container ${theme && "dark-theme"}`}>
        <SideMenu showMenu={showMenu} />
        <Routes>
          <Route path="/" element={<Notes searchValue={searchValue} />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/labels/" element={<Labels />} />
          <Route path="/labels/:label" element={<NewLabel />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
