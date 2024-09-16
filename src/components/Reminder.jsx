import React from "react";
import { useSelector } from "react-redux";
function Reminder() {
  const theme = useSelector((state) => state.theme);
  return (
    <section className={`menu-sections ${theme && "dark-theme"}`}></section>
  );
}

export default Reminder;
