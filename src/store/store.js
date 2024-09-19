import { combineReducers, configureStore } from "@reduxjs/toolkit";
import keepReducer from "./keepSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "keep-persist",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, keepReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
export default store;
