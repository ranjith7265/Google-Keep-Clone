import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMoreTime } from "react-icons/md";
import { IoMdColorPalette, IoMdMore } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { BiSolidArchiveIn } from "react-icons/bi";
import { addNote, editState } from "../../../store/keepSlice";

function TakeNote({}) {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const inputNoteRef = useRef();
	const inputTitleRef = useRef();
	const theme = useSelector((state) => state.theme);
	const edit = useSelector((state) => state.edit);

	const handleOutsideClick = () => {
		if (
			inputTitleRef.current.value.trim() !== "" ||
			inputNoteRef.current.value.trim() !== ""
		) {
			handleClick();
		}
	};

	const handleKeypress = (e) => {
		e.key === "Enter" || (e.keyCode === 13 && handleClick());
	};

	const handleClick = () => {
		edit && dispatch(editState());
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
					type="text"
					className={`note-title ${edit ? "edit-mode" : ""} `}
					placeholder="Title"
					ref={inputTitleRef}
					style={show ? { display: "block" } : { display: "none" }}
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
