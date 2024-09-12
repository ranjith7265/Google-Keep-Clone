import React from "react";
import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";

function NoteList() {
  const notes = useSelector((state) => state.notes);
  const layout = useSelector((state) => state.fullLayout);
  const theme = useSelector((state) => state.theme);

  const currentNotes = notes.filter((note) => note.isArchive === false);
  const otherNotes = notes.filter(
    (note) => note.isArchive === false && note.isPinned === false
  );
  const pinnedNotes = notes.filter(
    (note) => note.isPinned === true && note.isArchive === false
  );

  if (currentNotes.length <= 0) {
    return (
      <section className="no-list-items">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="125"
          height="125"
          viewBox="0 0 24 24"
        >
          <path
            fill="#dfdfdf"
            d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
          ></path>
        </svg>
        <span>Notes you add appear here</span>
      </section>
    );
  } else {
    return (
      <div className="note-lists-container">
        {pinnedNotes.length > 0 && (
          <ul className={`note-lists ${layout ? "full-layout" : ""}`}>
            <span className={`note-batch ${theme && "note-batch-dark"}`}>
              PINNED
            </span>
            {pinnedNotes.map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
          </ul>
        )}
        <ul className={`note-lists ${layout ? "full-layout" : ""}`}>
          {pinnedNotes.length > 0 && (
            <span className={`note-batch ${theme && "note-batch-dark"}`}>
              OTHERS
            </span>
          )}
          {otherNotes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </ul>
      </div>
    );
  }
}
export default NoteList;
