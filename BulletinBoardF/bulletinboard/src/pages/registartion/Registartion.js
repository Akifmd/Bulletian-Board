import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

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

const Register = () => {
  const [Registration, setRegistration] = useState({
    UserName: "",
    Email: "",
    Password: "",
    IsActive: "",
  });
  const navigate = useNavigate;

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (e, props) => {
    setRegistration({ ...Registration, [props]: e.target.value });
  };
  const resetData = () => {
    setRegistration({
      UserName: "",
      Email: "",
      Password: "",
      IsActive: "",
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (
      Registration.Email.trim() === "" ||
      Registration.UserName.trim() === "" ||
      Registration.Password.trim() === "" ||
      Registration.IsActive.trim() === ""
    ) {
      toast.error("Form is invalid");
      return;
    } else {
      axios
        .post(
          "https:/localhost:5036/api/Registration/RegisterHere",
          Registration
        )
        .then((response) => {
          console.log("adding to database", response);
          toast.success("User Registered Successfully");
          navigate("/login");

          setRegistration({
            UserName: "",
            Email: "",
            Password: "",
            IsActive: "",
          });
        })

        .catch((error) => {
          console.log("error log");
          alert("Error in Backend, failed!");
          setError({
            errors: error,
            isError: true,
          });
        });
    }
  };

  useEffect(() => {
    console.log(Registration);
  }, [Registration]);

  return (
    <>
      <div>
        <Container className="mt-4">
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              <Card>
                <CardHeader>
                  <center>
                    {" "}
                    <h3>Register Here</h3>
                  </center>
                </CardHeader>

                <CardBody>
                  <Form onSubmit={submitForm}>
                    <FormGroup>
                      <Label for="UserName">Enter UserName</Label>
                      <Input
                        type="text"
                        placeholder="Enter UserName"
                        id="UserName"
                        onChange={(e) => handleChange(e, "UserName")}
                        value={Registration.UserName}
                      ></Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="email">Enter Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter Email"
                        id="email"
                        onChange={(e) => handleChange(e, "Email")}
                        value={Registration.Email}
                      ></Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Enter Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        id="password"
                        onChange={(e) => handleChange(e, "Password")}
                        value={Registration.Password}
                      ></Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="IsActive">Enter isActive</Label>
                      <Input
                        type="number"
                        placeholder="Enter IsActive"
                        id="IsActive"
                        onChange={(e) => handleChange(e, "IsActive")}
                        value={Registration.IsActive}
                      ></Input>
                    </FormGroup>

                    <Container className="text-center">
                      <center>
                        <Button color="secondary" type="submit">
                          Register
                        </Button>
                        <Button color="light" type="reset" onClick={resetData}>
                          Reset
                        </Button>{" "}
                      </center>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Register;
