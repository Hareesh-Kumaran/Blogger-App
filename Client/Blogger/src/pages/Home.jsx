import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { fetchuserDetails } from "../Redux/Feature/userSlice";
import { fetchBlog, setSearchValue } from "../Redux/Feature/BlogSlice";
import WelcomeBanner from "../Components/WelcomeBanner";
import Mime from "mime";
import BlogCard from "../Components/BlogCard";
import CountryList from "../Components/DropDown";
import '../Styles/HomePage/HomePage.css';

export default function HomePage() {
  const [cookie, setCookie] = useCookies(["Blogging_Token"]);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { blogList, searchList } = useSelector((state) => state.blog);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookie.Blogging_Token && !isLoggedIn ) {
      console.log('@cookie',document.cookie[0]);
      const ID = localStorage.getItem("Blogging_UserID");
      dispatch(fetchuserDetails(ID));
    }

    dispatch(fetchBlog());
  }, []);

  function findMediaType(src) {
    return Mime.getType(src);
  }

  function renderBlogCard(list)
  {
    return list.map((blog) => (
      <BlogCard
        ID={blog._id}
        mediaType={findMediaType(blog.media)}
        src={blog.media}
        title={blog.title}
        description={blog.description}
        date={blog.date}
        owner={blog.owner}
      />
    ));
  }

  return (
    <>
      <WelcomeBanner />
      <div className="filter-feature-container ">
        <div className="searchbar-container">
          <label>Search</label>
          <input
            className="searchInput"
            placeholder="Search by title and category"
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
          />
        </div>

        <CountryList />
      </div>
      <div className="blog-list-wrapper-container">
        <div className="blog-title-wrapper">
          <h1 className="blog-title">Here Are Our Blogs.</h1>
        </div>
        <div className="blog-list-container">
          {renderBlogCard(searchList.length ? searchList : blogList)}
        </div>
      </div>
    </>
  );
}
