import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Form } from "react-bootstrap";
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
    <>
      <h2 className="title">Create Your Blog</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Enter Title"
            onChange={(e) => dispatch({ type: "title", value: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>category</Form.Label>
          <Form.Control
            placeholder="Enter Topic"
            onChange={(e) =>
              dispatch({ type: "category", value: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Description"
            style={{ height: "100px" }}
            onChange={(e) =>
              dispatch({ type: "description", value: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Select
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
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control value={new Date().toDateString()} disabled />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload the image or video</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) =>
              dispatch({ type: "file", value: e.target.files[0] })
            }
          />
        </Form.Group>

        <button onClick={(e) => postBlog(e)}>Create</button>
      </Form>
    </>
  );
}

export default CreateBlog;
