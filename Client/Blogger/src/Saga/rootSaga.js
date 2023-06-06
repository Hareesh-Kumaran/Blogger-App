import { fork, all } from "redux-saga/effects";
import userWatcherFunction from "./userSaga";
import blogWatcherFunction from "./blogSaga";
export default function* rootSaga() {
  yield all([fork(userWatcherFunction), fork(blogWatcherFunction)]);
}