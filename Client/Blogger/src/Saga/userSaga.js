import { takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import { fetchUserSuccesful } from "../Redux/Feature/userSlice";
import { userEndPoint } from "../utils/ApiUrl";

function* getUserDetails(action) {
  const response = yield axios.get(`${userEndPoint}/${action.payload}`);
  yield put(fetchUserSuccesful(response.data));
}

export default function* userWatcherFunction() {
  yield takeLatest("user/fetchuserDetails", getUserDetails);
}
