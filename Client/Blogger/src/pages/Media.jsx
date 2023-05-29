import "../Styles/MediaPage/MediaPage.css";
import MediaCard from "../Components/MediaCard";
import { useSelector } from "react-redux";
import { fetchBlog } from "../Redux/Feature/BlogSlice";
import { useDispatch } from "react-redux";
import Mime from "mime";
import { useEffect } from "react";

function findMediaType(src) {
  return Mime.getType(src);
}
function MediaPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBlog());
  }, []);
  const { blogList } = useSelector((State) => State.blog);
  return (
    <>
    <h1 className="title">Download our media.</h1>
      <div className="media-list-wrapper">
        {console.log(blogList)}
        {blogList.map((blog) => (
          <MediaCard
            ID={blog._id}
            mediaType={findMediaType(blog.media)}
            src={blog.media}
            title={blog.title}
            description={blog.description}
            date={blog.date}
            owner={blog.owner}
          />
        ))}
      </div>
    </>
  );
}

export default MediaPage;
