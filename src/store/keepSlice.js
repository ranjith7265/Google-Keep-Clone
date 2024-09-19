import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notes: [],
  deletedNotes: [],
  fullLayout: false,
  theme: false,
  labels: [],
  editNote: {},
  edit: false,
};

const keepSlice = createSlice({
  name: "notes",
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
    updateNote: (state, action) => {
      const { id, title, noteText } = action.payload;
      state.notes = state.notes.map((note) =>
        note.id === id ? { ...note, title: title, note: noteText } : note
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
      const {id , color} = action.payload
      state.notes = state.notes.map((note) =>
        note.id === id
          ? { ...note, color: color }
          : note
      );
    },
    addTime: (state, action) => {
      const {id, time} = action.payload
      state.notes = state.notes.map((note) =>
        note.id === id
          ? { ...note, time: time }
          : note
      );
    },
    createLabel: (state, action) => {
      state.labels.push(action.payload);
    },
    setLabel: (state, action) => {
      const {id, label} = action.payload 
      state.notes = state.notes.map((note) =>
        note.id === id
          ? { ...note, label: label }
          : note
      );
    },
    deleteLabel: (state, action) => {
      state.labels.pop(action.payload);
    },
    imgUrl: (state, action) => {
      const {id, imgUrl} = action.state
      state.notes = state.notes.map((note) =>
        note.id === id
          ? { ...note, imgUrl: imgUrl }
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
    editState: (state) => {
      state.edit = !state.edit;
    },
    getEditNote: (state, action) =>{
      state.editNote = action.payload
    }
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
  updateNote,
  editState,
  getEditNote
} = keepSlice.actions;

export default keepSlice.reducer;
