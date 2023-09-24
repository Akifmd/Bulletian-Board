import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Row,
} from "reactstrap";
import axios from "axios";
import { getAllCategory } from "../../Services/getcategory";
import JoditEditor from "jodit-react";

import { toast } from "react-toastify";
import { getCurrentUserDetail, islogin } from "../../auth";
import { Link, useParams, useNavigate } from "react-router-dom";

const AddPost = () => {
  const editor = useRef(null);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);

  const [categories, setCategories] = useState([]);
  const { Email } = useParams();
  const { UserName } = useParams();

  const [post, setPost] = useState({
    Post: "",
    PostDetials: "",
    category: "",
    UserName: UserName,
    Email: Email,
  });

  const fieldChanged = (e) => {
    setPost({ ...post, [e.target.id]: e.target.value });
  };

  const detailsFieldChanged = (data) => {
    setPost({ ...post, PostDetials: data });
  };
  const navigate = useNavigate();
  const createPost = (e) => {
    e.preventDefault();
    // console.log("inserted")
    if (
      post.Post.trim() === "" ||
      post.PostDetials.trim() === "" ||
      post.category.trim() === ""
    ) {
      alert("Fill all the Details");
      return;
    } else {
      islogin()
        ? axios
            .post("https://localhost:5036/api/Post/InsertSinglePosts", post)
            .then((response) => {
              if (response.data === "success") {
                toast.success("post addedd Successfully");
                navigate("/" + UserName + "/" + Email);
              } else {
                toast.error("Please Enter correct Password or Email");
              }
            })
        : alert("Login to Create Post");
    }
  };

  useEffect(() => {
    getAllCategory()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setLogin(islogin());
    setUser(getCurrentUserDetail());
  }, []);
  return (
    <div className="wrapper ">
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          <br />
          {login && (
            <Link
              to={"/" + user.UserName + "/" + user.Email}
              className="btn border"
            >
              Home
            </Link>
          )}
          {!login && (
            <Link to={"/"} className="btn border">
              Home
            </Link>
          )}

          <Card className="shadow border-0 mt-2 ">
            <center>
              <CardHeader>
                <h5>Create Your Post</h5>
              </CardHeader>
            </center>
            <CardBody>
              <Form onSubmit={createPost}>
                <div className="my-4">
                  <label for="Post">Post Title</label>
                  <Input
                    type="text"
                    id="Post"
                    placeholder="Enter Here"
                    onChange={fieldChanged}
                    value={post.Post}
                  />
                </div>

                <div className="my-4">
                  <label for="PostDetials">Post Details</label>

                  <JoditEditor
                    ref={editor}
                    id="PostDetials"
                    placeholder="Enter Details"
                    onChange={detailsFieldChanged}
                    value={post.PostDetials}
                  />
                </div>

                <div className="my-4">
                  <label for="category">Post Category</label>
                  <Input
                    type="select"
                    id="category"
                    placeholder="Enter Category"
                    defaultValue={0}
                    value={post.category}
                    onChange={fieldChanged}
                  >
                    <option value={0}>Select Category</option>
                    {categories.map((category) => (
                      <option
                        value={category.categoryName}
                        key={category.CateId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </Input>
                </div>

                <Container className="text-center">
                  <Button onClick={createPost} color="primary" type="submit">
                    Create Post
                  </Button>
                  <Button color="danger">Reset Post</Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddPost;
