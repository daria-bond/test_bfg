import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = () => combineReducers({});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer());
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(saga);
