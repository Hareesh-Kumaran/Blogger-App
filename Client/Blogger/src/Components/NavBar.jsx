import "../Styles/Navigation_styles/Navigations.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { resetUserState } from "../Redux/Feature/userSlice";
import { useRef, useState } from "react";

function NavigationBar() {
  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();

  const navPostion = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  };

  const [cookie, setCookie] = useCookies(["Blogging_Token"]);
  const navigate = useNavigate();

  const logoutFunction = () => {
    setCookie("Blogging_Token", "");
    localStorage.removeItem("Blogging_UserID");
    navigate("/auth");
    dispatch(resetUserState());
  };

  return (
    <nav className="navigation-wrapper">
      <div className="logo-wrapper">
        <NavLink to={"/"} className="links">
          <span className="logo">Blogo.</span>
        </NavLink>
      </div>

      <div
        className={
          !showNav ? "feature-btn-wrapper" : "feature-btn-wrapper-expanded"
        }
      >
        {/* <button>media</button> */}

        {cookie.Blogging_Token && (
          <>
            <NavLink
              className="links"
              to={"/blog/create"}
              onClick={() => setShowNav(false)}
            >
              Create Blog
            </NavLink>

            <NavLink
              className="links"
              to={"/media"}
              onClick={() => setShowNav(false)}
            >
              Media
            </NavLink>
          </>
        )}

        <a href="#footer" className="links" onClick={() => setShowNav(false)}>
          Contact us
        </a>

        {cookie.Blogging_Token ? (
          <button
            className="nav-btn"
            onClick={() => {
              logoutFunction();
              setShowNav(false);
            }}
          >
            logout
          </button>
        ) : (
          <button
            style={{ border: "none" }}
            className="nav-btn"
            onClick={() => {
              navigate("/auth");
              setShowNav(false);
            }}
          >
            Login
          </button>
        )}
      </div>

      <button
        className="ham-menu-btn"
        onClick={(e) => {
          setShowNav(!showNav);
        }}
      >
        {!showNav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        )}
      </button>
    </nav>
  );
}

export default NavigationBar;
