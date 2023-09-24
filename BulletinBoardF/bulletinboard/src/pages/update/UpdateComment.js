import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

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
import { islogin } from "../../auth";

export const UpdateComment = () => {
  const { cId } = useParams();
  const { UserName } = useParams();
  const { Email } = useParams();
  const { pId } = useParams();

  const [data, setData] = useState({
    UserName: UserName,
    Email: Email,
    cId: cId,
    comments: "",
  });

  const handleChange = (e, props) => {
    setData({ ...data, [props]: e.target.value });
  };
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    if (data.comments.trim() === "") {
      toast.error("Enter The Comments to Update");
    } else {
      islogin()
        ? axios
            .put("https:/localhost:5036/api/Comments/UpdateSingleComment", data)
            .then(function (response) {
              if (response.data === "success") {
                toast.success("Comment Updated Successfully");
                navigate("/postdetialss/" + pId + "/" + UserName + "/" + Email);
              } else {
                toast.error("Please Enter correct Password or Email");
              }
            })
        : alert("Login to Update the Comments");
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <center>
                <CardHeader>Update Comment</CardHeader>
              </center>

              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="comments">Enter Comments</Label>
                    <Input
                      type="text"
                      placeholder="Enter Comments"
                      id="comments"
                      value={data.comments}
                      onChange={(e) => handleChange(e, "comments")}
                    ></Input>
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
