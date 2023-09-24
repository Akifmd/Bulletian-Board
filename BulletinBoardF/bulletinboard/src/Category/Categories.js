import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { CategoryDisplay } from "./CategoryDisplay";
import axios from "axios";
import Post from "../pages/Post/PostContent";

export const Categories = () => {
  const { categoryName } = useParams();
  const [posts, setPost] = useState([]);
  useEffect(() => {
    // console.log(categoryName)
    axios
      .get("https:/localhost:5036/api/POST/GetAllThePostsUnderCategory", {
        params: {
          Category: categoryName,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      });
  }, [categoryName]);
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={2} className=" pt-3">
            <CategoryDisplay />
          </Col>
          <Col md={10}>
            <h2>Posts ({posts.length})</h2>
            {posts.map((post) => {
              return <Post post1={post} />;
            })}
            {posts.length <= 0 ? <h1>No Posts in Category </h1> : ""}
          </Col>
        </Row>
      </Container>
    </>
  );
};
