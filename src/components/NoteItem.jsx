import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlinePushPin, MdDelete } from "react-icons/md";
import { MdOutlineArchive, MdOutlineColorLens } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { TbPinnedFilled } from "react-icons/tb";
import { BiSolidArchiveIn } from "react-icons/bi";
import TakeNote from "./TakeNote";
import {
  removeNote,
  pinNote,
  archiveNote,
  updateCardColor,
  setLabel,
  imgUrl,
  editState,
} from "../store/keepSlice";

function NoteItem({ note, index, onDragStart, DragEnd }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [Cardhide, setCardHide] = useState(false);
  const theme = useSelector((state) => state.theme);
  const layout = useSelector((state) => state.fullLayout);
  const labels = useSelector((state) => state.labels);
  const edit = useSelector((state) => state.edit);
  const [editItem, setEditItem] = useState(null);

  const handleFileUpload = (e) => {
    dispatch(
      imgUrl({ id: note.id, imgUrl: URL.createObjectURL(e.target.files[0]) })
    );
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleCardClick = (note) => {
    setEditItem(note);
    dispatch(editState());
  };
  return (
    <>
      <li
        className={`card note-list ${
          theme ? "text-bg-secondary" : ""
        } m-3 p-2 ${Cardhide ? "hide" : ""}`}
        style={{
          width: `${layout ? "40rem" : "16rem"}`,
          backgroundColor: `${note.color}`,
        }}
        draggable
        onDragStart={() => {
          onDragStart(index);
          setCardHide(true);
        }}
        onDragEnd={() => setCardHide(false)}
        onDrop={() => DragEnd(index)}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <img
          className="card-img-top"
          src={note.imgUrl}
          style={{ display: `${file ? "block" : "none"}` }}
        ></img>
        <div className="card-body" onClick={() => handleCardClick(note)}>
          <h5
            className={`card-title ${theme ? "text-white" : ""}`}
            style={{ color: "#5f6368" }}
          >
            {note.title}
          </h5>
          <p
            className={`card-text ${theme ? "text-light" : ""}`}
            style={{ color: "#5f6368" }}
          >
            {note.note}
          </p>
        </div>
        <span className="image-upload">
          <input
            type="file"
            id={note.title}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <label htmlFor={note.title} style={{ cursor: "pointer" }}>
            <CiImageOn />
          </label>
        </span>
        <span className="card-color-pick">
          <input
            className={note.id}
            type="color"
            id={note.id}
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            onChange={(e) =>
              dispatch(updateCardColor({ id: note.id, color: e.target.value }))
            }
          />
          <label htmlFor={note.id} style={{ cursor: "pointer" }}>
            <MdOutlineColorLens />
          </label>
        </span>
        <span className="card-pin-icon">
          {note.isPinned ? (
            <TbPinnedFilled
              color={`${file !== null ? "#fff" : "#000"}`}
              style={{ fontSize: 16 }}
              onClick={() => dispatch(pinNote(note.id))}
            />
          ) : (
            <MdOutlinePushPin
              color={`${file !== null ? "#fff" : "#000"}`}
              style={{ fontSize: 16 }}
              onClick={() => dispatch(pinNote(note.id))}
            />
          )}
        </span>
        <span
          className="delete-icon"
          onClick={() => dispatch(removeNote(note.id))}
        >
          <MdDelete style={{ fontSize: 16 }} />
        </span>
        <span className="archive-icon">
          {note.isArchive ? (
            <BiSolidArchiveIn
              style={{ fontSize: 15 }}
              onClick={() => dispatch(archiveNote(note.id))}
            />
          ) : (
            <MdOutlineArchive
              style={{ fontSize: 15 }}
              onClick={() => dispatch(archiveNote(note.id))}
            />
          )}
        </span>
        {file !== null && (
          <span className="img-delete-icon" onClick={() => setFile(null)}>
            <MdDelete color="#fff" style={{ fontSize: 16 }} />
          </span>
        )}
        <span className="time-batch">
          <span className={theme ? "badge" : ""}>{note.time}</span>
        </span>
        {labels.length > 0 && (
          <div className="select-container ">
            <select
              className="custom-select"
              style={theme && { backgroundColor: "transparent" }}
              onChange={(e) =>
                dispatch(setLabel({ id: note.id, label: e.target.value }))
              }
            >
              <option value=""></option>
              {labels.map((label) => (
                <option key={label} className="label-option" value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}
      </li>
      <div
        className="edit-note"
        style={{
          display: `${edit && note === editItem ? "block" : "none"}`,
        }}
      >
        <TakeNote edit={edit} editItem={editItem} setEditItem={setEditItem} />
      </div>
    </>
  );
}

export default NoteItem;
