import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { doLogin } from "../../auth";

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
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [login, setlogin] = useState({
    UserName: "",
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e, props) => {
    setlogin({ ...login, [props]: e.target.value });
  };

  const resetData = () => {
    setlogin({
      UserName: "",
      Email: "",
      Password: "",
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (
      login.UserName.trim() == "" ||
      login.Email.trim() == "" ||
      login.Password.trim() == ""
    ) {
      toast.error("Form is Invalid");
    } else {
      axios
        .post("https:/localhost:5036/api/Registration/LoginHere", login)
        .then((response) => {
          if (response.data == "Valid User") {
            doLogin(login, () => {
              navigate("/" + login.UserName + "/" + login.Email);
            });

            toast.success("User Login Successfully");
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
      <div>
        <Container className="mt-5 ">
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              <Card>
                <CardHeader>
                  <center>
                    {" "}
                    <h3>Login Here</h3>
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
                        value={login.UserName}
                        onChange={(e) => handleChange(e, "UserName")}
                      ></Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="email">Enter Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter Email"
                        id="email"
                        value={login.Email}
                        onChange={(e) => handleChange(e, "Email")}
                      ></Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="password">Enter Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        id="password"
                        value={login.Password}
                        onChange={(e) => handleChange(e, "Password")}
                      ></Input>
                    </FormGroup>
                    <Container className="text-center">
                      <Button color="dark" outline>
                        Login
                      </Button>
                      <Button color="light" type="reset" onClick={resetData}>
                        Reset
                      </Button>
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

export default Login;
