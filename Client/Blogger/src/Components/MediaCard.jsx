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
      </div>
    </>
  );
}
