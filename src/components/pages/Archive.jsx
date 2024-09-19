import { useSelector } from "react-redux";
import NoteItem from "../pages/Notes/NoteItem";

function Archive() {
  const notes = useSelector((state) => state.notes);
  const theme = useSelector((state) => state.theme);
  const archivedNotes = notes.filter((note) => note.isArchive === true);

  if (archivedNotes.length <= 0) {
    return (
      <section className={`no-list-items ${theme && "dark-theme"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="124"
          height="124"
          viewBox="0 0 24 24"
        >
          <path
            fill="#dfdfdf"
            d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"
          ></path>
        </svg>
        <span>Your archived notes appear here</span>
      </section>
    );
  }
  return (
    <section id="archive" className={`menu-sections ${theme && "dark-theme"}`}>
      <ul className="note-lists">
        {archivedNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </section>
  );
}
export default Archive;
