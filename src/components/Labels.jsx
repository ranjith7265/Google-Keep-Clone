import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLabel } from "../store/keepSlice";

function Labels() {
  const dispatch = useDispatch();
  const labelRef = useRef();
  const theme = useSelector((state) => state.theme);

  const handleClick = () => {
    dispatch(createLabel(labelRef.current.value));
    labelRef.current.value = "";
  };
  return (
    <section id="labels" className={`menu-sections ${theme && "dark-theme"}`}>
      <div className="create-label-container">
        <input
          className={`label-input ${theme && "dark-theme"}`}
          type="text"
          placeholder="Create new label"
          ref={labelRef}
        />
        <div>
          <button onClick={handleClick}>Done</button>
        </div>
      </div>
    </section>
  );
}

export default Labels;
