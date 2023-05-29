import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { Container, Nav } from "react-bootstrap";
import HomePage from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import NavBar from "./Components/NavBar";
import FormPage from "./pages/FormPage";
import { Provider } from "react-redux";
import reduxStore from "./Redux/store";
import CreateBlog from "./pages/CreateBlog";
import EditBlogPage from "./pages/EditBlogPage";
import "react-toastify/dist/ReactToastify.css";


import "./Styles/app.css";
import Footer from "./Components/Footer";
import MediaPage from "./pages/Media";
function App() {
  return (
    <Provider store={reduxStore}>
      <ToastContainer />
      <BrowserRouter>
        <Container>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<FormPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/blog">
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/blog/create" element={<CreateBlog />} />
              <Route path="/blog/edit/:id" element={<EditBlogPage />} />
            </Route>
          </Routes>
          <Footer />
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
