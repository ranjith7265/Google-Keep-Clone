import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notes: [],
  deletedNotes: [],
  fullLayout: false,
  theme: false,
  labels: [],
};

const keepSlice = createSlice({
  name: "Notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const time = new Date().toLocaleTimeString();
      const { title, note } = action.payload;
      state.notes.push({
        id: uuidv4(),
        title: title,
        note: note,
        isArchive: false,
        isPinned: false,
        edit: false,
        color: "",
        time: time,
        label: "",
      });
    },
    removeNote: (state, action) => {
      const deletedNote = state.notes.find(
        (note) => note.id === action.payload
      );
      state.deletedNotes.push(deletedNote);
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    pinNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload
          ? { ...note, isPinned: !note.isPinned }
          : note
      );
    },
    archiveNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload
          ? { ...note, isArchive: !note.isArchive }
          : note
      );
    },
    removeForever: (state, action) => {
      state.deletedNotes = state.deletedNotes.filter(
        (note) => note.id !== action.payload
      );
    },
    toggleLayout: (state) => {
      state.fullLayout = !state.fullLayout;
    },
    toggleTheme: (state) => {
      state.theme = !state.theme;
    },
    updateCardColor: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id
          ? { ...note, color: action.payload.color }
          : note
      );
    },
    addTime: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id
          ? { ...note, time: action.payload.time }
          : note
      );
    },
    createLabel: (state, action) => {
      state.labels.push(action.payload);
    },
    setLabel: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id
          ? { ...note, label: action.payload.label }
          : note
      );
    },
    deleteLabel: (state, action) => {
      state.labels.pop(action.payload);
    },
    imgUrl: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id
          ? { ...note, imgUrl: action.payload.imgUrl }
          : note
      );
    },
    updateDrag: (state, action) => {
      const pinned = state.notes.filter((note) => note.isPinned === true);
      state.notes = [...action.payload, ...pinned];
    },
    updatePinnedDrag: (state, action) => {
      const others = state.notes.filter((note) => note.isPinned === false);
      state.notes = [...action.payload, ...others];
    },
  },
});

export const {
  addNote,
  removeNote,
  pinNote,
  archiveNote,
  removeForever,
  toggleLayout,
  toggleTheme,
  updateCardColor,
  createLabel,
  setLabel,
  deleteLabel,
  imgUrl,
  updateDrag,
  updatePinnedDrag,
} = keepSlice.actions;

export default keepSlice.reducer;
