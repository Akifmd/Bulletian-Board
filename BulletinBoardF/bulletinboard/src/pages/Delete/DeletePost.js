import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import {
  Card,
  CardBody,
  CardHeader,
  Form,
  Container,
  Button,
  Row,
  Col,
} from "reactstrap";
import { islogin } from "../../auth";
import { useNavigate } from "react-router-dom";

export const DeletePost = () => {
  const { pId } = useParams();
  const { UserName } = useParams();
  const { Email } = useParams();

  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();

    islogin()
      ? axios
          .delete("https://localhost:5036/api/Post/DeleteSinglePosts", {
            params: {
              pId: pId,
              UserName: UserName,
              Email: Email,
            },
          })
          .then(function (response) {
            if (response.data == "success") {
              toast.success("Post Deleted Successfully");
              navigate("/" + UserName + "/" + Email);
            } else {
              toast.error("Please Enter correct Password or Email");
            }
          })
      : alert("Login to Delete the Posts");
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <center>
                <CardHeader>Delete Post</CardHeader>
              </center>

              <CardBody>
                <Form onSubmit={submitForm}>
                  <center>
                    <h3>Are you sure to Delete the Post</h3>

                    <Button className=" btn-danger border">Delete</Button>
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
