import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Notes from "./components/Notes";
import Reminder from "./components/Reminder";
import Archive from "./components/Archive";
import Trash from "./components/Trash";
import Labels from "./components/Labels";
import NewLabel from "./components/newLabel";
import { editState } from "./store/keepSlice";

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
            <Route path="/labels/:label" element={<NewLabel />} />
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
