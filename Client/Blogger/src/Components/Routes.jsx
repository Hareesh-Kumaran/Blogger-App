import {Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import FormPage from "../pages/FormPage";
import MediaPage from "../pages/Media";
import BlogPage from "../pages/BlogPage";
import CreateBlog from "../pages/CreateBlog";
import EditBlogPage from "../pages/EditBlogPage";

export default function AppRoutes() {
  return (
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
  );
}
