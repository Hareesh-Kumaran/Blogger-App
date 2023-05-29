import "../Styles/BlogPage/blogpage.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Mime from "mime";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { fetchuserDetails } from "../Redux/Feature/userSlice";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function BlogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false);
  const [cookie, setCookie] = useCookies(["Blogging_Token"]);
  const { userDetails, isLoggedIn } = useSelector((state) => state.user);
  console.log("login", userDetails);
  const [blog, setBLog] = useState({});
  const [mediaType, setMediaType] = useState("");
  const [date, setDate] = useState("Not working");
  const [author, setAuthor] = useState({});

  const { id } = useParams();

  const getAuthorName = async (id) => {
    const response = await axios.get(`http://localhost:7000/user/${id}`);

    setAuthor({ ...response.data });
  };

  const dateFormatter = (data) => {
    console.log("@dateFormatter", data);
    const date = new Date(data);
    return setDate(date.toDateString());
  };
  function findMediaType(src) {
    setMediaType(Mime.getType(src));
  }

  const fetchBlogByID = async () => {
    const response = await axios.get(`http://localhost:7000/blog/${id}`);
    setBLog({ ...response.data });
    findMediaType(response.data.media);
    dateFormatter(response.data.date);
    getAuthorName(response.data.owner);
  };

  useEffect(() => {
    if (cookie.Blogging_Token && isLoggedIn === false) {
      console.log("fetching user");
      const ID = localStorage.getItem("Blogging_UserID");
      dispatch(fetchuserDetails(ID));
    }
    fetchBlogByID();
  }, []);

  const deleteBlog = async () => {
    const response = await axios.delete(`http://localhost:7000/blog/${id}`);
    if (response.data.success) {
      navigate("/");
      toast.success(`Deleted the blog ${blog.title}`, {
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
  };
  return (
    <>
      <div className="blog-page-main-wrapper">
        <div className="blog-page-left-wrapper">
          {mediaType.includes("image") ? (
            <img src={blog.media} className="media-style" />
          ) : (
            <video src={blog.media} controls={true}/>
          )}
        </div>
        <div className="blog-page-right-wrapper">
          <div className="details-container-wrapper">
            <p className="blog-title">{blog.title}</p>

            <div className="date-and-author-wrapper">
              <div className="date-container">Published on {date}</div>
              <div className="author-container">
                Created by {author.firstname}
              </div>
            </div>
          </div>
          <div className="content-container">
            <p className="blog-content">{blog.description}</p>
          </div>
        </div>
      </div>

      {(userDetails._id === author._id || userDetails.role === "Admin") && (
        <div className="blog-page-button-container">
          <button onClick={() => navigate(`/blog/edit/${blog._id}`)}>
            Edit
          </button>
          <button onClick={() => setDeleteModal(!deleteModal)}>Delete</button>
        </div>
      )}

      <Modal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        centered
        className="modal-body-wrapper"
      >
        <Modal.Header className="modal-header" closeButton>
          Are you Sure ?
        </Modal.Header>
        <Modal.Body className="modal-content">
          Do you really want to delete this blog ?
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button onClick={deleteBlog}>Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
