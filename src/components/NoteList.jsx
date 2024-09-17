import { useDispatch, useSelector } from "react-redux";
import NoteItem from "./NoteItem";
import { useState, useEffect } from "react";
import { updateDrag, updatePinnedDrag } from "../store/keepSlice";

const NoteList = () => {
  const dispatch = useDispatch();
  const [otherNotes, setOtherNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [drag, setDrag] = useState({
    OthersDragStart: null,
    OthersDragEnd: null,
    PinnedDragStart: null,
    PinnedDragEnd: null,
  });
  const notes = useSelector((state) => state.notes);
  const layout = useSelector((state) => state.fullLayout);
  const theme = useSelector((state) => state.theme);

  const currentNotes = notes.filter((note) => note.isArchive === false);

  useEffect(() => {
    setOtherNotes(
      notes.filter(
        (note) => note.isArchive === false && note.isPinned === false
      )
    );

    setPinnedNotes(
      notes.filter((note) => note.isPinned === true && note.isArchive === false)
    );
  }, [notes]);

  if (drag.PinnedDragStart !== null && drag.PinnedDragEnd !== null) {
    let arranged = Array.from(pinnedNotes);
    const [removePinnedNote] = arranged.splice(drag.PinnedDragStart, 1);
    arranged.splice(drag.PinnedDragEnd, 0, removePinnedNote);

    dispatch(updatePinnedDrag(arranged));
    setDrag({ ...drag, PinnedDragStart: null });
    setDrag({ ...drag, PinnedDragEnd: null });
  }

  if (drag.OthersDragStart !== null && drag.OthersDragEnd !== null) {
    let arranged = Array.from(otherNotes);
    const [removeOtherNote] = arranged.splice(drag.OthersDragStart, 1);
    arranged.splice(drag.OthersDragEnd, 0, removeOtherNote);
    dispatch(updateDrag(arranged));
    setDrag({ ...drag, OthersDragStart: null });
    setDrag({ ...drag, OthersDragEnd: null });
  }

  console.log(drag);
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
  }

  return (
    <div className="note-lists-container">
      {pinnedNotes.length > 0 && (
        <ul className={`note-lists ${layout ? "full-layout" : ""}`}>
          <span className={`note-batch ${theme && "note-batch-dark"}`}>
            PINNED
          </span>
          {pinnedNotes.map((note, index) => (
            <NoteItem
              key={note.id}
              note={note}
              index={index}
              onDragStart={(index) =>
                setDrag({ ...drag, PinnedDragStart: index })
              }
              DragEnd={(index) => setDrag({ ...drag, PinnedDragEnd: index })}
            />
          ))}
        </ul>
      )}

      <ul className={`note-lists ${layout ? "full-layout" : ""}`}>
        {pinnedNotes.length > 0 && (
          <span className={`note-batch ${theme && "note-batch-dark"}`}>
            OTHERS
          </span>
        )}
        {otherNotes.map((note, index) => (
          <NoteItem
            key={note.id}
            note={note}
            index={index}
            onDragStart={(index) =>
              setDrag({ ...drag, OthersDragStart: index })
            }
            DragEnd={(index) => setDrag({ ...drag, OthersDragEnd: index })}
          />
        ))}
      </ul>
    </div>
  );
};
export default NoteList;
