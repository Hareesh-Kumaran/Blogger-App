import "../Styles/CreateBlog/createblog.css";
import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import getCountrylist from "../utils/Country_data";
import { toast } from "react-toastify";
import axios from "axios";

function CreateBlog() {
  const [cookie, setCookie] = useCookies(["Blogging_Token"]);
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState([]);
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isLoggedIn && !cookie.Blogging_Token) {
      toast.warn("please login to create a blog", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    }

    getCountrylist().then((data) => setCountryData([...data]));
  }, []);

  const initialState = {
    title: "",
    category: "",
    description: "",
    location: "India",
    file: undefined,
    owner: userDetails._id,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "title":
        return { ...state, title: action.value };

      case "category":
        return { ...state, category: action.value };

      case "description":
        return { ...state, description: action.value };
      case "location":
        return { ...state, location: action.value };
      case "file":
        return { ...state, file: action.value };
    }
  }

  const postBlog = async (e) => {
    e.preventDefault();
    let response = await axios.post(
      "http://localhost:7000/blog/",
      { ...state },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      navigate("/");
    }
  };

  return (
    <div className="create-main-wrapper">
      <p className="title">Create Your Blog</p>

      <div className="input-field-wrapper">
        <label>Title</label>
        <input
          placeholder="Enter Title"
          onChange={(e) => dispatch({ type: "title", value: e.target.value })}
        />
      </div>

      <div className="input-field-wrapper">
        <label>category</label>
        <input
          placeholder="Enter Topic"
          onChange={(e) =>
            dispatch({ type: "category", value: e.target.value })
          }
        />
      </div>

      <div className="textarea-field-wrapper">
        <label>Description</label>
        <textarea
          placeholder="Enter Description"
          style={{ height: "100px" }}
          onChange={(e) =>
            dispatch({ type: "description", value: e.target.value })
          }
        />
      </div>

      <div className="dropdown-wrapper">
        <label>Location</label>
        <select
          onChange={(e) =>
            dispatch({ type: "location", value: e.target.value })
          }
          size="sm"
        >
          <option>India</option>
          {countryData.map((item, index) => {
            return (
              <option style={{}} value={item.country} key={index}>
                {item.country}
              </option>
            );
          })}
        </select>
      </div>

      <div className="input-field-wrapper">
        <label>Date</label>
        <input value={new Date().toDateString()} disabled />
      </div>

      <div className="file-input-wrapper">
        <label>Upload the image or video</label>
        <input
          type="file"
          onChange={(e) => dispatch({ type: "file", value: e.target.files[0] })}
        />
      </div>

      <div className="button-container">
        <button onClick={(e) => postBlog(e)}>Create</button>
      </div>
    </div>
  );
}

export default CreateBlog;
