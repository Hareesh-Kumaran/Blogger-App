import { BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { Container, Nav } from "react-bootstrap";
import NavBar from "./Components/NavBar";
import { Provider } from "react-redux";
import reduxStore from "./Redux/store";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/app.css";
import Footer from "./Components/Footer";
import AppRoutes from "./Components/Routes";



function App() {
  return (
    <Provider store={reduxStore}>
      <ToastContainer />
      <BrowserRouter>
        <Container>
          <NavBar />
          <AppRoutes/>
          <Footer />
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
