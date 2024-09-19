import { useSelector } from "react-redux";
import TakeNote from "./TakeNote";
import NoteList from "./NoteList";
import NoteItem from "./NoteItem";

function Notes({ searchValue }) {
	const theme = useSelector((state) => state.theme);
	const notes = useSelector((state) => state.notes);

	const searchFiltered = notes.filter((note) => {
		if (searchValue.length > 0) {
			if (
				note.note.toLowerCase().includes(searchValue.toLowerCase()) ||
				note.title.toLowerCase().includes(searchValue.toLowerCase())
			) {
				return note;
			}
		}
	});

	if (searchValue.trim().length > 0) {
		return (
			<section
				id="archive"
				className={`menu-sections ${theme ? "dark-theme" : ""}`}
			>
				{searchFiltered.length === 0 && (
					<span className="notFound">No Matching Results!!</span>
				)}
				<ul className="note-lists">
					{searchFiltered.map((note) => (
						<NoteItem key={note.id} note={note} />
					))}
				</ul>
			</section>
		);
	}
	return (
		<section
			id="notes"
			className={`menu-sections ${theme ? "dark-theme" : ""}`}
		>
			<TakeNote />
			<NoteList />
		</section>
	);
}

export default Notes;
