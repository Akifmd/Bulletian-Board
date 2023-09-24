import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, Container, Row, Col, CardHeader } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import Post from "./PostContent";
import { getCurrentUserDetail, islogin } from "../../auth";

export const PostByUser = () => {
  const { UserName } = useParams();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);

  const [username, setUserName] = useState({
    UserName: UserName,
  });

  useEffect(() => {
    axios
      .get("https:/localhost:5036/PostbyUser", {
        params: {
          UserName: UserName,
        },
      })
      .then((response) => {
        setUserName(response.data);
      });

    setLogin(islogin());
    setUser(getCurrentUserDetail());
  }, []);

  console.log(username);
  return (
    <>
      <Container className="mt-5">
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

        <Row>
          <Col sm={{ size: 11, offset: 1 }}>
            <Card className="mt-2">
              <CardHeader>
                <center>
                  <div>Your Post</div>
                </center>
              </CardHeader>
            </Card>
            <h3>Your Post Are: ({username.length})</h3>

            {username &&
              username.map &&
              username.map((post) => {
                return <Post post1={post} />;
              })}
          </Col>
        </Row>
      </Container>
    </>
  );
};
