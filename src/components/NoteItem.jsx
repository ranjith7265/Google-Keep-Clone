import {
  MdOutlinePushPin,
  MdDelete,
  MdOutlineArchive,
  MdOutlineColorLens,
} from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { TbPinnedFilled } from "react-icons/tb";
import { BiSolidArchiveIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  removeNote,
  pinNote,
  archiveNote,
  updateCardColor,
} from "../store/keepSlice";
import { useState } from "react";

function NoteItem({ note }) {
  const theme = useSelector((state) => state.theme);
  const layout = useSelector((state) => state.fullLayout);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const handleFileUpload = (e) => {
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <li
      className={`card note-list ${theme && "text-bg-secondary"} m-3 p-2`}
      style={{
        width: `${layout ? "40rem" : "16rem"}`,
        backgroundColor: `${note.color}`,
      }}
    >
      <img
        class="card-img-top"
        src={file}
        style={{ display: `${file ? "block" : "none"}` }}
      ></img>
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
      <span className="image-upload">
        <input
          type="file"
          id={note.id}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <label htmlFor={note.id}>
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
            top: 10,
            right: -40,
          }}
          onChange={(e) =>
            dispatch(updateCardColor({ id: note.id, color: e.target.value }))
          }
        />
        <label htmlFor={note.id}>
          <MdOutlineColorLens />
        </label>
      </span>
      <span className="card-pin-icon">
        {note.isPinned ? (
          <TbPinnedFilled
            style={{ fontSize: 16 }}
            onClick={() => dispatch(pinNote(note.id))}
          />
        ) : (
          <MdOutlinePushPin
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
    </li>
  );
}

export default NoteItem;
