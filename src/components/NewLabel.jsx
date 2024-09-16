import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NoteItem from "./NoteItem";

function NewLabel() {
  const { label } = useParams();
  const notes = useSelector((state) => state.notes);
  const theme = useSelector((state) => state.theme);

  const filtered = notes.filter(
    (note) => note.label.toLowerCase() === label.toLowerCase()
  );

  console.log(filtered);

  return (
    <section className={`menu-sections ${theme && "dark-theme"}`}>
      <ul className="note-lists">
        {filtered.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </section>
  );
}

export default NewLabel;
