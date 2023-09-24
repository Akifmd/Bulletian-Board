import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Button } from "reactstrap";
import Post from "./PostContent";
import "../../App.css";
import { useParams } from "react-router-dom";
import { islogin } from "../../auth";
import { useNavigate } from "react-router-dom";

function NewFeed() {
  const { Email } = useParams();
  const { UserName } = useParams();
  const [postContent, setPostContent] = useState([]);
  useEffect(() => {
    axios.get("https:/localhost:5036/api/Post").then((response) => {
      console.log(response);
      setPostContent(response.data);
    });
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = postContent.slice(firstIndex, lastIndex);
  const npage = Math.ceil(postContent.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  const navigate = useNavigate();

  function createPosts() {
    return islogin()
      ? navigate("/post/" + UserName + "/" + Email)
      : alert("Login to Create Posts");
  }

  function viewPosts() {
    return islogin()
      ? navigate("/yourPost/" + UserName)
      : alert("Login to View Your Posts");
  }
  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 12,
          }}
        >
          <h3>
            All Posts ({postContent.length})
            <Button onClick={createPosts} className="border -0 ms-5 ">
              Create Posts
            </Button>
            <Button onClick={viewPosts} className="border -0 ms-5 ">
              Your Posts
            </Button>
          </h3>

          {records.map((post) => {
            return <Post post1={post} />;
          })}
        </Col>
      </Row>

      <nav className="navigations">
        <ul className="navs-list">
          <li className="navs-item">
            <a className="page-item" href="#" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`navs-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a href="#" className="page-item" onClick={() => changeCPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="navs-item">
            <a className="page-item" href="#" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NewFeed;
