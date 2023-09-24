import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./pages/about/About";
import Registration from "./pages/registartion/Registartion";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Navigationbar from "./components/Navbar";
import Contact from "./pages/contact/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "./pages/Post/addpost";
import PostDetials from "./pages/Post/PostDetials";
import { Categories } from "./Category/Categories";
import { DeleteComment } from "./pages/Delete/DeleteComment";
import { UpdateComment } from "./pages/update/UpdateComment";
import { DeletePost } from "./pages/Delete/DeletePost";
import { UpdatePost } from "./pages/update/UpdatePost";
import { PostByUser } from "./pages/Post/PostByUser";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <>
      <Router>
        <Navigationbar />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:UserName/:Email/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:UserName/:Email" element={<Post />} />
          <Route
            path="/postdetialss/:pId/:UserName/:Email"
            element={<PostDetials />}
          />
          <Route path="/categories/:categoryName" element={<Categories />} />
          <Route
            path="/deleteComment/:cId/:UserName/:Email/:pId"
            element={<DeleteComment />}
          />
          <Route
            path="/deletepost/:pId/:UserName/:Email"
            element={<DeletePost />}
          />
          <Route
            path="/updatecomment/:cId/:UserName/:Email/:pId"
            element={<UpdateComment />}
          />
          <Route
            path="/updatepost/:pId/:UserName/:Email"
            element={<UpdatePost />}
          />
          <Route path="/yourPost/:UserName" element={<PostByUser />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
export default App;
