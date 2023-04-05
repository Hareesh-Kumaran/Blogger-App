import Container from "react-bootstrap/Container";
import { Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CountryList from "./DropDown";


function NavigationBar() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate=useNavigate();
  const navPostion = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  };
  return (
    <Navbar expand="md">
      <Container>
        <NavLink to={"/"} style={{ textDecoration: "none" }}>
          <Navbar.Brand>Logo incoming</Navbar.Brand>
        </NavLink>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse>
          <Nav className="me-auto" style={navPostion}>
            <CountryList />
            <button>media</button>
            {isLoggedIn && (
              <NavLink style={{ textDecoration: "none" }} to={"/blog"}>
                Create Blog
              </NavLink>
            )}
            <NavLink>Contact us</NavLink>
          </Nav>
          <button style={{ border: "none" }} onClick={()=>navigate('/auth')}>Register/Login</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
