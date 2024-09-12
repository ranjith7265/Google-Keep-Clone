import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { MdRestoreFromTrash } from "react-icons/md";
import { removeForever, addNote } from "../store/keepSlice";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function Trash() {
  const dispatch = useDispatch();
  const deletedNotes = useSelector((state) => state.deletedNotes);
  const theme = useSelector((state) => state.theme);

  setInterval(() => {
    deletedNotes.forEach((note) => dispatch(removeForever(note.id)));
  }, 604800000);
  // 604800000 --- 7 days to milliseconds

  const handleDeleteForever = (id) => {
    Swal.fire({
      text: "Delete note forever?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
         dispatch(removeForever(id));
       }
     });
  };
  const handleRestore = (note) => {
    dispatch(addNote(note));
    dispatch(removeForever(note.id));
   
  };
  const handleEmptyTrash = () => {
    Swal.fire({
      text: "Empty trash? All notes in trash  will be permanenetly deleted",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deletedNotes.forEach((note) => dispatch(removeForever(note.id)));
        Swal.fire({
          title: "Cleared!",
        });
      }
    });
  };
  return (
    <section id="trash" className={`menu-sections ${theme && "dark-theme"}`}>
      <nav className="trash-nav">
        <span>Notes in trash are deleted after 7 days</span>
        <button onClick={handleEmptyTrash}>Empty Trash</button>
      </nav>
      <ul className="note-lists">
        {deletedNotes.map((note) => (
          <li
            key={note.id}
            className={`card ${theme && "text-bg-secondary"} m-3`}
            style={{ width: "16rem" }}
          >
            <div className="card-body">
              <h5
                className={`card-title ${theme && "text-white"}`}
                style={{ color: "#5f6368" }}
              >
                {note.title}
              </h5>
              <p
                className={`card-text ${theme && "text-light"}`}
                style={{ color: "#5f6368" }}
              >
                {note.note}
              </p>
            </div>
            <span
              className="delete-icon"
              onClick={() => handleDeleteForever(note.id)}
            >
              <MdDeleteForever style={{ fontSize: 18 }} />
            </span>
            <span className="archive-icon">
              <MdRestoreFromTrash
                style={{ fontSize: 18 }}
                onClick={() => handleRestore(note)}
              />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Trash;
