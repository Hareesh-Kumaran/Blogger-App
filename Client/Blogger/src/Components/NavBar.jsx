import "../Styles/Navigation_styles/Navigations.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { resetUserState } from "../Redux/Feature/userSlice";
import {useState } from "react";
import {ReactComponent as HamMenu} from '../public/hamMenu.svg'
import {ReactComponent as HamMenuClose} from '../public/hamMenuClose.svg'

function NavigationBar() {
  const [showNav, setShowNav] = useState(false);

  const dispatch = useDispatch();

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
          <HamMenu/>
        ) : (
          <HamMenuClose/>
        )}
      </button>
    </nav>
  );
}

export default NavigationBar;
