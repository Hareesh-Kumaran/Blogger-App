import { takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
import {
  fetchBlog,
  addToBlogList,
  setSearchList,
} from "../Redux/Feature/BlogSlice";


function* getBlogs() {
  const response = yield axios.get("http://localhost:7000/blog/");

  console.log(response.data);

  yield put(addToBlogList(response.data));
}

function* getBlogsByLocation() {
  const { location } = yield select((state) => state.blog);
  console.log("@saga", location);

  if (location === "none") {
    //if they want to select all the
    yield put(fetchBlog({}));
    return;
  }

  const response = yield axios.get(
    `http://localhost:7000/blog/location/${location}`
  );

  console.log(response.data.blogList);

  if (response.data.isFound) {
    console.log("@dbug");

    yield put(addToBlogList(response.data.blogList));
  } else {
    yield put(fetchBlog({}));
    toast.warn(`No blogs found for location ${location}`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

function* getFilteredBlogs() {
  const { searchValue, blogList } = yield select((state) => state.blog);

  const filterCondition = (item) => {
    if (item.category.toLowerCase().includes(searchValue.toLowerCase()))
      return true;

    if (item.title.toLowerCase().includes(searchValue.toLowerCase()))
      return true;
  };

  const matchedResult = blogList.filter((item) => filterCondition(item));

  yield put(setSearchList([...matchedResult]));
}


export default function* blogWatcherFunction() {
  yield takeLatest("blog/fetchBlog", getBlogs);
  yield takeLatest("blog/setLocation", getBlogsByLocation);
  yield takeLatest("blog/setSearchValue", getFilteredBlogs);
}
