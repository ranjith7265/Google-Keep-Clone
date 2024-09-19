import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMoreTime } from "react-icons/md";
import { IoMdColorPalette, IoMdMore } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { BiSolidArchiveIn } from "react-icons/bi";
import { addNote, editState } from "../../../store/keepSlice";

const noteObject = {
	title: "",
	note: "",
};

function TakeNote({}) {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [NoteItem, setNoteItem] = useState(noteObject);
	const theme = useSelector((state) => state.theme);
	const edit = useSelector((state) => state.edit);
	const { title, note } = NoteItem;

	const handleOutsideClick = () => {
		if (title.trim() !== "" || note.trim() !== "") {
			handleClick();
		}
	};

	const handleKeypress = (e) => {
		if (e.keyCode === 13) {
			handleClick();
		}
	};

	const handleClick = () => {
		edit && dispatch(editState());
		if (!edit) {
			if (title.trim() !== "" || note.trim() !== "") {
				dispatch(
					addNote({
						title,
						note,
					})
				);
			}
		}
		setNoteItem(noteObject);
		setShow(false);
	};
	return (
		<section
			className="take-note-container"
			onClick={handleOutsideClick}
			onKeyUp={handleKeypress}
		>
			<div
				className={`take-note ${theme ? "note-dark" : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<input
					value={NoteItem.title}
					type="text"
					className={`note-title ${edit ? "edit-mode" : ""} `}
					placeholder="Title"
					onChange={(e) => setNoteItem({ ...NoteItem, title: e.target.value })}
					style={show ? { display: "block" } : { display: "none" }}
				/>
				<input
					name="note"
					value={NoteItem.note}
					type="text"
					className="note-textarea"
					placeholder="Take a note"
					onChange={(e) => setNoteItem({ ...NoteItem, note: e.target.value })}
					onClick={() => setShow(true)}
				/>
				<div></div>
				<footer
					className={`note-footer ${edit ? "edit-mode" : ""} `}
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
