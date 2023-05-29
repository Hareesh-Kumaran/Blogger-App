import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import { userEndPoint } from "../utils/ApiUrl";
import { fetchBlog } from "../Redux/Feature/BlogSlice";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

export default function MediaCard({ ID, src, title, date, mediaType, owner }) {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [time, setTime] = useState("");

  const fetchUsername = async () => {
    let response = await axios.get(`${userEndPoint}/${owner}`);
    setUserName(response.data.firstname);
  };

  const DateFormatter = (data) => {
    const date = new Date(data);
    return setTime(date.toDateString());
  };

  useEffect(() => {
    fetchUsername();
    DateFormatter(date);
    dispatch(fetchBlog());
  }, []);

  const handleDownload=(url)=>{
      saveAs(url,uuid());
  }

  return (
    <>
    
      <div className="card-wrapper">
        {mediaType.includes("image") ? (
          <img src={src} />
        ) : (
          <video controls={true}>
            <source src={src} />
          </video>
        )}

        {mediaType.includes("image") && (
          <div className="hover-container" onClick={() => handleDownload(src)}>
            Click To Download
          </div>
        )}

        {/* <div class="card-body-wrapper">
        <span className="blog-title">{title}</span>
        <div class="btn-container">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </button>
        </div>
      </div> */}
      </div>
    </>
  );
}
