import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/layout/Header";
import SideMenu from "./components/layout/SideMenu";
import Notes from "./components/pages/Notes/Notes";
import Reminder from "./components/pages/Reminder";
import Archive from "./components/pages/Archive";
import Trash from "./components/pages/Trash";
import Labels from "./components/pages/Labels/Labels";
import CreateLabel from "./components/pages/Labels/CreateLabel";
import { editState } from "./store/keepSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const theme = useSelector((state) => state.theme);
  const edit = useSelector((state) => state.edit);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const getSearchValue = (value) => {
    setSearchValue(value);
  };
  return (
    <Router>
      <div style={{ position: "relative" }}>
        <Header onMenuClick={handleMenuClick} getSearchValue={getSearchValue} />
        <div className={`hero-container ${theme && "dark-theme"}`}>
          <SideMenu showMenu={showMenu} />
          <Routes>
            <Route path="/" element={<Notes searchValue={searchValue} />} />
            <Route path="/reminder" element={<Reminder />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/labels/" element={<Labels />} />
            <Route path="/labels/:label" element={<CreateLabel />} />
            <Route path="/trash" element={<Trash />} />
          </Routes>
        </div>
        <div
          className={`${edit ? "overlay" : ""}`}
          onClick={() => dispatch(editState())}
        ></div>
      </div>
    </Router>
  );
}

export default App;
