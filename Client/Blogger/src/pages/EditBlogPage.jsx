import "../Styles/EditPage/EditPage.css";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import getCountrylist from "../utils/Country_data";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Mime from "mime";

export default function EditBlogPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [editBlog, setEditBlog] = useState({});
  const [countryData, setCountryData] = useState([]);
  const [cookie, setCookie] = useCookies(["Blogging_Token"]);
  const [file, setFile] = useState(null);
  



  
  function findMediaType(srcLink) {
    console.log((Mime.getType(srcLink)))
    return Mime.getType(srcLink);
  }

  const fetchBlog = async () => {
    const response = await axios.get(`http://localhost:7000/blog/${id}`);
    setEditBlog({ ...response.data });
  };

  useEffect(() => {
    if (!isLoggedIn && !cookie.Blogging_Token) {
      toast.warn("please login to edit a blog", {
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
    fetchBlog();
    getCountrylist().then((data) => setCountryData([...data]));
  }, []);

  const updateBlog = async () => {
    const response = await axios.put(
      `http://localhost:7000/blog/${id}`,
      file
        ? {
            title: editBlog.title,
            category: editBlog.category,
            location: editBlog.location,
            description: editBlog.description,
            file: file,
          }
        : {
            title: editBlog.title,
            category: editBlog.category,
            location: editBlog.location,
            description: editBlog.description,
          },
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

  console.log('File upload',file);
  return (
    <div className="edit-main-wrapper">
      <h2 className="title">Edit Your Blog</h2>
      <div className="input-field-wrapper">
        <label>Title</label>
        <input
          placeholder="Enter Title"
          value={editBlog.title}
          onChange={(e) =>
            setEditBlog((pre) => ({ ...pre, title: e.target.value }))
          }
        />
      </div>
      <div className="input-field-wrapper">
        <label>Category</label>
        <input
          placeholder="Enter Topic"
          value={editBlog.category}
          onChange={(e) =>
            setEditBlog((pre) => ({ ...pre, category: e.target.value }))
          }
        />
      </div>
      <div className="textarea-field-wrapper">
        <label>Description</label>
        <textarea
          placeholder="Enter Description"
          value={editBlog.description}
          onChange={(e) =>
            setEditBlog((pre) => ({ ...pre, description: e.target.value }))
          }
        />
      </div>
      <div className="dropdown-wrapper">
        <label>Location</label>
        <select
          onChange={(e) =>
            setEditBlog((pre) => ({ ...pre, location: e.target.value }))
          }
          size="sm"
        >
          <option>{editBlog.location}</option>
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
      Media
      <div className="edit-blog-mediacontainer">
        {!file ? (
          editBlog.media && findMediaType(editBlog.media).includes("image") ? (
            <img src={editBlog.media} />
          ) : (
            <video src={editBlog.media} controls={true} />
          )
        ) : (file.type.includes("image") ? (
          <img src={URL.createObjectURL(file)} />
        ) : (
          <video src={URL.createObjectURL(file)} controls={true} />
        ))}
      </div>
      <div className="file-input-wrapper">
        <label>Upload the image or video</label>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      </div>
      <div className="edit-button-container">
        <button
          onClick={(e) => {
            e.preventDefault();
            updateBlog();
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
