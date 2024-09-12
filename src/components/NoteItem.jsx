import React from "react";
import { MdOutlinePushPin, MdDelete, MdOutlineArchive } from "react-icons/md";
import { TbPinnedFilled } from "react-icons/tb";
import { BiSolidArchiveIn } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { removeNote, pinNote, archiveNote } from "../store/keepSlice";

function NoteItem({ note }) {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <li
      className={`card ${theme && "text-bg-secondary"} m-3`}
      style={{ minWidth: "16rem" }}
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
