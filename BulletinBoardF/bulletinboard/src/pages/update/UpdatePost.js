import React, { useState, useEffect, useRef } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllCategory } from "../../Services/getcategory";

import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Button,
  Row,
  Col,
} from "reactstrap";
import JoditEditor from "jodit-react";
import { islogin } from "../../auth";

export const UpdatePost = () => {
  const editor = useRef(null);
  const { pId } = useParams();
  const { UserName } = useParams();
  const { Email } = useParams();
  const [categories, setCategories] = useState([]);

  const [data, setData] = useState({
    UserName: UserName,
    Email: Email,
    pId: pId,
    Post: "",
    PostDetials: "",
    category: "",
  });

  const fieldChanged = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const detailsFieldChanged = (dataa) => {
    setData({ ...data, PostDetials: dataa });
  };

  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();

    if (
      data.Post.trim() === "" ||
      data.PostDetials.trim() === "" ||
      data.category.trim() === ""
    ) {
      toast.error("Form is Invalid");
    } else {
      islogin
        ? axios
            .put("https:/localhost:5036/api/Post/UpdateSinglePosts", data)
            .then(function (response) {
              if (response.data === "success") {
                toast.success("Post Updated Successfully");
                navigate("/" + UserName + "/" + Email);
              } else {
                toast.error("Please Enter correct Password or Email");
              }
            })
        : alert("Login to Update the Post");
    }
  };
  useEffect(() => {
    getAllCategory()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col sm={{ size: 10, offset: 1 }}>
            <Card>
              <center>
                <CardHeader>Update Post</CardHeader>
              </center>

              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="Post">Post Title</Label>
                    <Input
                      type="text"
                      placeholder="Enter Post"
                      id="Post"
                      value={data.Post}
                      onChange={fieldChanged}
                    ></Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="PostDetials">Post Details</Label>
                    <JoditEditor
                      ref={editor}
                      id="PostDetials"
                      placeholder="Enter Details"
                      onChange={detailsFieldChanged}
                      value={data.PostDetials}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="category">Post Category</Label>
                    <Input
                      type="select"
                      id="category"
                      placeholder="Enter Category"
                      defaultValue={0}
                      value={data.category}
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
                  </FormGroup>
                  <center>
                    <Button className=" btn-danger border">Update</Button>
                  </center>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
