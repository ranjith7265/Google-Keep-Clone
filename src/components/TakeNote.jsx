import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMoreTime } from "react-icons/md";
import { IoMdColorPalette, IoMdMore } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { BiSolidArchiveIn } from "react-icons/bi";
import { addNote, editState } from "../store/keepSlice";

function TakeNote({ edit, editItem }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const inputNoteRef = useRef();
  const inputTitleRef = useRef();
  const theme = useSelector((state) => state.theme);

  console.log(editItem);
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
    if (edit) {
      setValueT("");
      dispatch(editState());
    }

    if (!edit) {
      if (
        inputTitleRef.current.value.trim() !== "" ||
        inputNoteRef.current.value.trim() !== ""
      ) {
        dispatch(
          addNote({
            title: inputTitleRef.current.value,
            note: inputNoteRef.current.value,
          })
        );
        inputTitleRef.current.value = "";
        inputNoteRef.current.value = "";
      }
    }
  };
  return (
    <section
      className="take-note-container"
      onClick={handleOutsideClick}
      onKeyUp={handleKeypress}
      style={edit ? { zIndex: 7 } : { zIndex: "auto" }}
    >
      <div
        className={`take-note ${theme && "note-dark"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          className="note-title"
          placeholder="Title"
          ref={inputTitleRef}
          style={show || edit ? { display: "block" } : { display: "none" }}
        />
        <input
          type="text"
          className="note-textarea"
          placeholder="Take a note"
          ref={inputNoteRef}
          onClick={() => setShow(true)}
        />
        <div></div>
        <footer
          className="note-footer"
          style={show || edit ? { display: "" } : { display: "none" }}
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
