import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  notes: [],
  deletedNotes: [],
  fullLayout: false,
  theme: false,
};

const keepSlice = createSlice({
  name: "Notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const { title, note } = action.payload;
      state.notes.push({
        id: uuidv4(),
        title: title,
        note: note,
        isArchive: false,
        isPinned: false,
        color: ""
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
    updateDrag: (state, action) => {
      // const updateArray = action.payload
      // const newArray = updateArray.filter(
      //   (note) =>
      //     !state.notes.some((existingItem) => existingItem.id === note.id)
      // );
      // console.log(newArray)
      // const pinned = state.notes((note) => note.isPinned === true)
      state.notes = [...action.payload];
    },
    updateCardColor: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id
          ? { ...note, color: action.payload.color }
          : note
      );
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
  updateDrag,
  updateCardColor
} = keepSlice.actions;

export default keepSlice.reducer;
