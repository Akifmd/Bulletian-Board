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

export const DeleteComment = () => {
  const { cId } = useParams();
  const { pId } = useParams();
  console.log(pId);
  const { UserName } = useParams();
  const { Email } = useParams();

  const [data, setData] = useState({
    UserName: UserName,
    Email: Email,
    cId: cId,
  });

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    {
      axios
        .delete("https:/localhost:5036/api/Comments/DeleteSingleComment", {
          params: {
            cId: data.cId,
            UserName: UserName,
            Email: Email,
          },
        })
        .then(function (response) {
          if (response.data == "success") {
            toast.success("Comment Deleted Successfully");
            navigate(
              "/postdetialss" + "/" + pId + "/" + UserName + "/" + Email
            );
          } else {
            toast.error("Please Enter correct Password or Email");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <center>
                <CardHeader>Delete Comment</CardHeader>
              </center>

              <CardBody>
                <Form onSubmit={submitForm}>
                  <h2>Are You Sure You Want to Delete?</h2>
                  <center>
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
