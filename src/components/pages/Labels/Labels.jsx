import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLabel } from "../../../store/keepSlice";

function Labels() {
  const dispatch = useDispatch();
  const [label, setLabel] = useState("")
  const theme = useSelector((state) => state.theme);

  const handleClick = () => {
    dispatch(createLabel(label));
    setLabel("")
  };
  return (
    <section id="labels" className={`menu-sections ${theme && "dark-theme"}`}>
      <div className="create-label-container">
        <input
          className={`label-input ${theme && "dark-theme"}`}
          type="text"
          placeholder="Create new label"
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
        <div>
          <button onClick={handleClick}>Done</button>
        </div>
      </div>
    </section>
  );
}

export default Labels;
