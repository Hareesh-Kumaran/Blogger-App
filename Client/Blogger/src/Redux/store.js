import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Feature/userSlice";
import blogReducer from "./Feature/BlogSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../Saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
  middleware: (currentMiddleware) => [
    ...currentMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);
export default store;
