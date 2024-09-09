import React from "react";
import "./App.css";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="hero-container">
        <SideMenu />
      </div>
    </React.Fragment>
  );
}

export default App;
