import React, { useRef, useState } from "react";
import { MdOutlineMoreTime } from "react-icons/md";
import { IoMdColorPalette, IoMdMore } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { BiSolidArchiveIn } from "react-icons/bi";
import { addNote } from "../store/keepSlice";
import { useDispatch, useSelector } from "react-redux";

function TakeNote() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const inputTitleRef = useRef();
  const inputNoteRef = useRef();
  const [show, setShow] = useState(false);

  const handleOutsideClick = () => {
    if (
      inputTitleRef.current.value.trim() !== "" ||
      inputNoteRef.current.value.trim() !== ""
    ) {
      handleClick();
    }
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleClick();
    }
  };
  const handleClick = () => {
    setShow(false);
    const inputTitle = inputTitleRef.current.value.trim();
    const inputNote = inputNoteRef.current.value.trim();
    if (inputTitle !== "" || inputNote !== "") {
      dispatch(
        addNote({
          title: inputTitle,
          note: inputNote,
        })
      );
      inputTitleRef.current.value = "";
      inputNoteRef.current.value = "";
    }
  };
  return (
    <section
      className="take-note-container"
      onClick={handleOutsideClick}
      onKeyUp={handleKeypress}
    >
      <div
        className={`take-note ${theme && "note-dark"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          className="note-title"
          placeholder="Title"
          style={show ? { display: "block" } : { display: "none" }}
          ref={inputTitleRef}
        />
        <input
          type="text"
          className="note-textarea"
          placeholder="Take a note"
          onClick={() => setShow(true)}
          ref={inputNoteRef}
        />
        <div></div>
        <footer
          className="note-footer"
          style={show ? { display: "" } : { display: "none" }}
        >
          <div className="footer-links">
            <button>
              <MdOutlineMoreTime style={{ fontSize: 18 }} />
            </button>
            <button>
              <IoMdColorPalette style={{ fontSize: 18 }} />
            </button>
            <button>
              <CiImageOn style={{ fontSize: 18 }} />
            </button>
            <span>
              <BiSolidArchiveIn style={{ fontSize: 18 }} />
            </span>
            <span>
              <IoMdMore />
            </span>
          </div>
          <div className="note-close-btn">
            <button onClick={handleClick}>Close</button>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default TakeNote;
