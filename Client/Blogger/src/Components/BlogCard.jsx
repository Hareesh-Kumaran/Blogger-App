import { useState, useEffect } from "react";
import axios from "axios";
import { userEndPoint } from "../utils/ApiUrl";
import { useNavigate } from "react-router-dom";


export default function BlogCard({ ID, src, title, date, mediaType, owner }) {
  const navigate = useNavigate();
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
  }, []);

  return (
    <div class="card-wrapper">
      {mediaType.includes("image") ? (
        <img src={src} />
      ) : (
        <video>
          <source src={src} />
        </video>
      )}

      <div class="card-body-wrapper">
        <span className="blog-title">{title}</span>
        <span className="blog-description">
          Created by {userName} on {time}
        </span>
        <div class="btn-container">
          <button onClick={() => navigate(`/blog/${ID}`)}>Read</button>
        </div>
      </div>
    </div>
  );
}
