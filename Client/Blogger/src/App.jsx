import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { Container, Nav } from "react-bootstrap";
import HomePage from "./pages/Home";
import NavBar from './Components/NavBar';
import FormPage from "./pages/FormPage";
 import {Provider} from 'react-redux';
 import reduxStore from './Redux/store';
 //style
 import './Styles/app.css';
function App() {
  return (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<FormPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
